const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    department:String,
    doctorname: String,
    patientname: String,
    date: Date,
    time: String,
    status: { type: String, default: 'pending' },
    doctorid: String,
    patientid: String
})