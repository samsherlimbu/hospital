const mongoose = require('mongoose');
const { Schema } = mongoose;

const sliderSchema = new Schema({
  description: { type: String }, // Ensure consistency with field names
  sliderImage: [{ type: String }],
});

const slider = mongoose.model('slider', sliderSchema);
module.exports = slider;
