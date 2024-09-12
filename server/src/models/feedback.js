const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
  email: { type: String, required: true }, // Add required field validation
  message: { type: String, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
