const Post = require('../models/about'); // Ensure the path is correct

// Controller to add new about info
const About = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const newPost = new Post(req.body);
    await newPost.save();  // Save the new post to the database
    console.log('Post saved:', newPost);
    res.status(201).json({ message: 'About added successfully', data: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    res.status(500).json({ message: 'Error saving post', error: error.message });
  }
};

// Controller to fetch all about info
const AboutInfo = async (req, res) => {
  try {
    const aboutInfo = await Post.find();  // Fetch all posts from the database
    res.status(200).json({ message: "About info fetched successfully", data: aboutInfo });
  } catch (error) {
    console.error('Error fetching about info:', error);
    res.status(500).json({ message: 'Error fetching about info', error: error.message });
  }
};

// Controller to delete specific about info by ID
const deleteAboutInfo = async (req, res) => {
  try {
    const { id } = req.params;
    await Post.findByIdAndDelete(id);  // Delete post by ID
    res.status(200).json({ message: 'About info deleted successfully' });
  } catch (error) {
    console.error('Error deleting about info:', error);
    res.status(500).json({ message: 'Error deleting about info', error: error.message });
  }
};

module.exports = { About, AboutInfo, deleteAboutInfo };
