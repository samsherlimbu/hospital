const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  status: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  terms: { type: Boolean, required: true },
});
const User = mongoose.model('User', userSchema);
module.exports = User;