const express = require('express');
const { getAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointment');
const router = express.Router();

router.get('/appointments', getAppointments); // Fetch all appointments
router.patch('/appointments/:id', updateAppointmentStatus); // Update appointment status
router.delete('/appointments/:id', deleteAppointment); // Delete an appointment

module.exports = router;
