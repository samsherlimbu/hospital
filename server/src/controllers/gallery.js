const Gallery = require('../models/gallery');

const galleryImage = async (req, res) => {
  try {
    if (!req.files?.length) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const { title } = req.body; // Retrieve title from request body

    // Insert the filenames and title into the database
    const galleryData = req.files.map(file => ({
      title, // Add title to each image object
      galleryImage: file.filename
    }));

    const savedGallery = await Gallery.insertMany(galleryData);

    res.status(201).json({
      message: 'Images uploaded successfully!',
      data: savedGallery,
    });
  } catch (error) {
    console.error('Error uploading gallery images:', error);
    res.status(500).json({ message: 'Error uploading images.' });
  }
};

const getImages = async(req,res)=>{
  try {
    const images = await Gallery.find();
    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Error fetching images.' });
  }
}
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the image ID from request params
    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: 'Image deleted successfully!' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Error deleting image.' });
  }
};
const deleteImagesByTitle = async (req, res) => {
  try {
    const { title } = req.params; // Retrieve the title from request params
    await Gallery.deleteMany({ title }); // Delete all images with the specified title
    
    res.status(200).json({ message: 'All images for the specified title deleted successfully!' });
  } catch (error) {
    console.error('Error deleting images by title:', error);
    res.status(500).json({ message: 'Error deleting images by title.' });
  }
};

module.exports = { galleryImage, getImages, deleteImage, deleteImagesByTitle };

