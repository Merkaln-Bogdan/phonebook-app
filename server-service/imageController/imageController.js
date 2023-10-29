
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const config = require("../configs/firebaseCofig");
const {v4: uuidv4, v4} = require("uuid");
const contactsModel = require("../models/contacts.model");
const usersModel = require("../models/user.model");

initializeApp(config.firebaseConfig);

const storage = getStorage();

const upload = multer({ storage: multer.memoryStorage() });

  
const updateContactImage = async (req, res, next) => {
    const {contactId} = req.params;

      try {
        const storageRef = ref(storage, `Contacts/${req.file.originalname}_${v4()}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        const contact = await contactsModel.findByIdAndUpdate(
          contactId,
          {
            image: downloadURL,
          }
        );

        if (!contact) {
          return res.status(404).json();
        }else{
          return res.status(200).send({
            data: contact,
            message: 'File uploaded!',
        })
        } 
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
  }

  const updateUserAvatar = async (req, res, next) => {
    const {_id} = req.user;

      try {
        const storageRef = ref(storage, `Users/${req.file.originalname}_${v4()}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        const user = await usersModel.findByIdAndUpdate(
          {_id},
          {
            avatarURL: downloadURL,
          }
        );

        if (!user) {
          return res.status(404).json();
        }else{
          return res.status(200).send({
            data: user,
            message: 'File uploaded!',
        })
        } 
        
    } catch (error) {
        return res.status(400).send(error.message)
    }
  }

module.exports = { updateContactImage, updateUserAvatar, upload };