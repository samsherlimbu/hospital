const mongoose = require('mongoose');
const { Schema } = mongoose;

const gallerySchema = new Schema({
  title: { type: String }, // Changed from galleryTitle to title
  galleryImage: [{ type: String }],
});

  
  const Gallery = mongoose.model('Gallery', gallerySchema);
  module.exports = Gallery;