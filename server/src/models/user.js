const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  address: { type: String },
  date: { type: Date, required: true },
  terms: { type: Boolean, required: true },
  isAdmin:{type:String, default:false}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
