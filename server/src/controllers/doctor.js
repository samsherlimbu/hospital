const Doctor = require('../models/doctor');

const doctoruser = async (req, res) => {
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

module.exports = { doctoruser, getAlldoctors };
