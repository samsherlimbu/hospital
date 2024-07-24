const mongoose = require('mongoose');
const { Schema } = mongoose;

const imageSchema = new Schema({
    frontimage: { type: String },
    doctorimage: { type: String }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
