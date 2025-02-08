const { Router } = require("express");
const usersRouter = Router();
const InitController = require("../controllers/init.controller");
const userController = require("../controllers/user.controller");
const ImageControllers = require("../imageController/imageController");
const { upload } = require("../imageController/imageController");

usersRouter.get("/", InitController.initInfoApp);

usersRouter.post(
  "/auth/register",
  userController.validateCreateUser,
  userController.createUser
);

usersRouter.get(
  "/auth/current",
  userController.authorize,
  userController.getCurrentUser
);

usersRouter.post(
  "/auth/signin",
  userController.validateSignIn,
  userController.signIn
);

usersRouter.patch(
  "/auth/logout",
  userController.authorize,
  userController.logOut
);

usersRouter.patch(
  "/auth/update",
  userController.authorize,
  userController.updateUser
);

usersRouter.patch(
  "/auth/avatar",
  userController.authorize,
  upload.single("avatar"),
  ImageControllers.updateUserAvatar
);

usersRouter.get("/auth/verify/:verificationToken", userController.verifyEmail);

module.exports = usersRouter;
