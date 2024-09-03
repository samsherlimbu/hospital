const express = require('express');
const { getAppointments, updateAppointmentStatus, deleteAppointment } = require('../controllers/appointment');
const router = express.Router();

router.get('/appointments', getAppointments);
router.patch('/appointments/:id', updateAppointmentStatus); // Route to update appointment status
router.delete('/appointments/:id', deleteAppointment); // Route to delete appointment

module.exports = router;
