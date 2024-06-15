// server/src/controllers/updateMessage.js
const Message = require("../models/message");

const updateMessage = async (req, res) => {
  try {
    const { message, messageFrom, name } = req.body;
    const newMessage = new Message({ message, messageFrom, name });
    await newMessage.save();
    res.status(201).json({ msg: 'Message saved successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ msg: 'Error saving message' });
  }
};

module.exports = updateMessage;
