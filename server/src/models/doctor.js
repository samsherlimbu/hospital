const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  department: { type: String, required: true },
  doctorImage:{type: String, required: true}
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
