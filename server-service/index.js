const express = require("express");
const cors = require("cors");
const usersRouter = require("./routers/usersRouter");
const contactsRouter = require("./routers/contactsRouter");
const mongoose = require("mongoose");

require("dotenv").config();

module.exports = class UserList {
  constructor() {
    this.server = null;
  }
  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initContactRoutes();
    this.initUserRoutes();
    await this.initDataBase();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(
      cors({ cors: {
        origin: [
          "https://merkaln-register-phonebook.netlify.app", 
          "https://merkaln-register-phonebook.netlify.app/auth/signin", 
          "https://phonebook-api-v2.onrender.com/auth/signin",
          "http://localhost:3000"
        ],
        default: "https://merkaln-register-phonebook.netlify.app"
      } })
    );
  }

  initContactRoutes() {
    this.server.use("/api/contacts", contactsRouter);
  }
  initUserRoutes() {
    this.server.use("/", usersRouter);
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("Start listening server", process.env.PORT);
    });
  }

  async initDataBase() {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    } catch (err) {
      process.exit(1);
    }
    console.log("Database connection successful");
  }

};
