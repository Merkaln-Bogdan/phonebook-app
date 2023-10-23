const { Router } = require("express");
const contactsRouter = Router();
const contactControllers = require("../controllers/contact.controller");
const userController = require("../controllers/user.controller");

contactsRouter.get(
  "/",
  userController.authorize,
  contactControllers.getListContacts
);
contactsRouter.post(
  "/",
  contactControllers.validateCreateContact,
  contactControllers.createContact
);
contactsRouter.get(
  "/:contactId",
  contactControllers.validateId,
  contactControllers.getContact
);
contactsRouter.delete(
  "/:contactId",
  contactControllers.validateId,
  contactControllers.deleteContact
);
contactsRouter.patch(
  "/:contactId",
  contactControllers.validateUpdateContact,
  contactControllers.validateId,
  contactControllers.updateContacts
);

module.exports = contactsRouter;
