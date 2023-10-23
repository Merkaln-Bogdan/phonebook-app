const mongoose = require("mongoose");
const { Schema } = mongoose;
const contactSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: false },
  number: { type: String, required: true },
  profession: { type: String, required: false },
  image: { type: Schema.Types.Mixed, required: false },
  gender: { type: String, required: true },

});
async function findContactByIdAndUpdate(contactId, updateParams) {
  return this.findByIdAndUpdate(
    contactId,
    { $set: updateParams },
    { new: true }
  );
}

async function findAll() {
  return this.find();
}

contactSchema.statics.findContactByIdAndUpdate = findContactByIdAndUpdate;
contactSchema.statics.findAll = findAll;

const contactsModel = mongoose.model("contact", contactSchema);

module.exports = contactsModel;
