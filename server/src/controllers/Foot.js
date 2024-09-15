const Foot = require('../models/Foot');

const addFooter = async (req, res) => {
  try {
    const footer = new Foot(req.body);
    await footer.save();
    res.status(201).json({ msg: 'Footer information saved successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error saving footer information', error });
  }
};

const getFooter = async (req, res) => {
  try {
    const footerData = await Foot.find();
    res.status(200).json(footerData);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching footer information', error });
  }
};

const deleteFooter = async (req, res) => {
  try {
    const { id } = req.params;
    await Foot.findByIdAndDelete(id);
    res.status(200).json({ msg: 'Footer information deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Error deleting footer information', error });
  }
};

module.exports = { getFooter, addFooter, deleteFooter };

