const mongoose = require('mongoose');

const patientCaseSchema = new mongoose.Schema({
  patient: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  doctor: { type: String, required: true },
  diseases: [{ name: { type: String, required: true } }],
  createdAt: { type: Date, default: Date.now },
});

const PatientCase = mongoose.model('PatientCase', patientCaseSchema);

module.exports = PatientCase;
