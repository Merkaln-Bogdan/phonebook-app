const imagemin = require("imagemin");
const imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

const { promises: fsPromises } = require("fs");
const express = require("express");
const { Router } = require("express");

const config = require("../configs/firebaseCofig")

const {initializeApp} = require("firebase/app");
const {addDoc, collection, doc, getDocs, getFirestore, query, where, documentId, setDoc, updateDoc, deleteDoc} = require("firebase/firestore");

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Get reference to employee collection
const employeesRef = collection(db, "phonebook");

// addDoc, collection, doc, getDocs, getFirestore, query, where, documentId, setDoc, updateDoc, deleteDoc
const multer = require("multer");
const path = require("path");

const imageRouter = Router();

const storage = multer.diskStorage({
  destination: "draft",
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

imageRouter.use(express.static("static"));

async function minifyImage(req, res, next) {
  const MINIFIED_DIR = "static";
console.log("minify Image", req.file);
  await imagemin([req.file.path], {
    destination: MINIFIED_DIR,
    plugins: [imageminJpegtran(), imageminPngquant()],
  });

  const { filename, path: draftPath } = req.file;
  await fsPromises.unlink(draftPath);
  req.file = {
    ...req.file,
    path: path.join(MINIFIED_DIR, filename),
    destination: MINIFIED_DIR,
  };
}

module.exports = { imageRouter, upload, minifyImage };