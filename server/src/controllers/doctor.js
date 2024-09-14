const Doctor = require('../models/doctor');

const doctoruser = async (req, res) => {
  req.body.doctorImage = req.file.filename

  // console.log(req.body,req.file.filename)
 
  try {
    const phoneNumberUserExists = await Doctor.exists({ phoneNumber: req.body.phoneNumber });
    const emailUserExists = await Doctor.exists({ email: req.body.email });

    if (phoneNumberUserExists) {
      return res.status(409).json({ message: 'Phone number already exists' });
    } else if (emailUserExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    await Doctor.create(req.body);
    return res.json({ message: 'User registration successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
};

const getAlldoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

const getDoctorsDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);  
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};
const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id );
    if (!doctor) return res.status(404).json({ msg: 'doctor not found' });
    res.status(200).json({ msg: 'doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting message' });
  }
}

module.exports = { doctoruser, getAlldoctors, getDoctorsDetails,deleteDoctor };
