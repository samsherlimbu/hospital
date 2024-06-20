const mongoose = require('mongoose');
const { Schema } = mongoose;

const departmentSchema = new Schema({
  department: { type: String, required: true },
 
});

const department = mongoose.model('department', departmentSchema);
module.exports = department;
