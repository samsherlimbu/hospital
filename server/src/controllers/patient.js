const Patient = require('../models/patient');

const createPatientCase = async (req, res) => {
  try {
    const newPatientCase = await Patient.create(req.body);
    return res.status(201).json({
      message: "Patient case created successfully",
      data: newPatientCase,
    });
  } catch (error) {
    console.error("Error creating patient case:", error);
    return res.status(500).json({ message: "Error creating patient case", error: error.message });
  }
};

const getPatientCases = async (req, res) => {
  try {
    const patientCases = await Patient.find();
    return res.json({
      message: "Patient cases fetched successfully",
      data: patientCases,
    });
  } catch (error) {
    console.error("Error fetching patient cases:", error);
    return res.status(500).json({ message: "Error fetching patient cases", error: error.message });
  }
};

const getPatientCaseById = async (req, res) => {
  try {
    const patientCase = await Patient.findById(req.params.id);
    if (!patientCase) {
      return res.status(404).json({ message: "Patient case not found" });
    }
    return res.status(200).json({
      message: "Patient case fetched successfully",
      data: patientCase,
    });
  } catch (error) {
    console.error("Error fetching patient case:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createPatientCase,
  getPatientCases,
  getPatientCaseById,
};
