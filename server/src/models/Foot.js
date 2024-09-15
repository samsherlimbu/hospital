const mongoose = require('mongoose');

const footerInfoSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  emergency: {
    type: String, // Change to String to match the frontend validation
    required: true,
  },
  bloodBank: {
    type: String, // Change to String to match the frontend validation
    required: true,
  },
  ambulance: {
    type: String, // Change to String to match the frontend validation
    required: true,
  },
  appointment: {
    type: String, // Change to String to match the frontend validation
    required: true,
  },
});

const Foot = mongoose.model('Foot', footerInfoSchema);
module.exports = Foot;
