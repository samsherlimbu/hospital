const Detail = require('../models/details');

const addDetail = async (req, res) => {
    req.body.doctorphoto = req.file.filename
  await Detail.create(req.body)

  // console.log(req.body,req.file.filename)
  res.status(201).json({ message: 'Detail added successfully' });
 
};

module.exports = { addDetail };
