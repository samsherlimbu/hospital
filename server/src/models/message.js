// server/src/models/message.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  message: String,
  messageFrom: String,
  name: String,
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
