const Message = require('../models/message');

const updateMessage = async (req, res) => {
  try {
    const { message, messageFrom, name } = req.body;
    const messageImage = req.file ? req.file.filename : null; // Handle file upload

    const newMessage = new Message({
      message,
      messageFrom,
      name,
      messageImage,
    });

    await newMessage.save();
    res.status(201).json({ msg: 'Message saved successfully', data: newMessage });
  } catch (error) {
    res.status(500).json({ msg: 'Error saving message' });
  }
};

const getMessage = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ msg: 'Messages fetched successfully', data: messages });
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching messages' });
  }
};

const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id); // Use req.params.id
    if (!message) return res.status(404).json({ msg: 'Message not found' });
    res.status(200).json({ msg: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting message' });
  }
};


module.exports = { updateMessage, getMessage ,deleteMessage};
