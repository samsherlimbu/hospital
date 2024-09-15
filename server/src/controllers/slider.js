const slider = require('../models/slider');

const sliderImage = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const { description } = req.body;

    const sliderData = req.files.map(file => ({
      description,
      sliderImage: file.filename
    }));

    const savedGallery = await slider.insertMany(sliderData);
    res.status(201).json({
      message: 'Images uploaded successfully!',
      data: savedGallery,
    });
  } catch (error) {
    console.error('Error uploading slider images:', error.message);
    res.status(500).json({ message: 'Error uploading images.', error: error.message });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await slider.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ message: 'Error fetching images.' });
  }
};

const deleteImageslider = async (req, res) => {
  try {
    const { id } = req.params;
    await slider.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image deleted successfully!' });
  } catch (error) {
    console.error('Error deleting image:', error.message);
    res.status(500).json({ message: 'Error deleting image.' });
  }
};

const deleteImagesByTitle = async (req, res) => {
  try {
    const { description } = req.params;
    await slider.deleteMany( description ); // Fix field name
    res.status(200).json({ message: 'All images for the specified title deleted successfully!' });
  } catch (error) {
    console.error('Error deleting images by title:', error.message);
    res.status(500).json({ message: 'Error deleting images by title.' });
  }
};

module.exports = { sliderImage, getImages, deleteImageslider, deleteImagesByTitle };
