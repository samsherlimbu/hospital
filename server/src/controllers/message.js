const Message = require("../models/message");


const updateMesssage = async(req,res)=>{
    try{
        const {message,messageFrom,name} = req.body;
        const newMessage = new Message({message,messageFrom,name});
        await newMessage.save();
        res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error saving message' });
  }
}

module.exports = updateMesssage;