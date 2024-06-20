const Department = require("../models/department");

const addDepartment = async (req, res) => {
  try {
    await Department.create(req.body);
    return res.json({ message: 'Department added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
};

const getdepartmentList = async (req, res) => {
  try {
    const departments = await Department.find(); // Ensure you return the data
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching departments' });
  }
};
module.exports = { addDepartment, getdepartmentList };