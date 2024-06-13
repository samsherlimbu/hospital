const mongoose = require("mongoose");
const {Schema} = mongoose

const messageSchema = new Schema({
    message:string,
    messageFrom:string,
    name:string,
})

const Message = mongoose.model('Message', messageSchema);
module.exports = Message