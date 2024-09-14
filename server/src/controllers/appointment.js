const Appointment = require('../models/appointment');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();// Log fetched appointments for debugging
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment status updated', appointment: updatedAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update appointment', error });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete appointment', error });
  }
};

module.exports = { getAppointments, updateAppointmentStatus, deleteAppointment };
