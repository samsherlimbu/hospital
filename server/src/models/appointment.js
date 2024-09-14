const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    department: { type: String, required: true },
    doctor: { type: String, required: true },
    appointmentDate: { type: Date, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    number: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    status: { type: String, default: 'pending' }, 
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
