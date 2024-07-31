const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
  doctorname: String,
  department: String,
  doctornumber: Number,
  doctorphoto: String
});

const Detail = mongoose.model('Detail', detailSchema);

module.exports = Detail;
