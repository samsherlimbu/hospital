const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  message: { type: String },
  messageFrom: { type: String },
  name: { type: String },
  messageImage: { type: String }, // Store the filename of the image
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
