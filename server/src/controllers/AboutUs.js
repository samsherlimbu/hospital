const Post = require('../models/AboutUs'); // Ensure consistent casing
// Ensure this path matches the actual model file

const Aboutmessage = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        
        const newPost = new Post(req.body);
        await newPost.save(); // Save the post to the database  

        console.log('Post saved:', newPost); // Log the saved post

        res.status(201).json({ message: 'About added successfully', data: newPost });
    } catch (error) {
        console.error('Error saving post:', error); // Detailed error logging
        res.status(500).json({ message: 'Error saving post', error: error.message });
    }
};
const getAboutMessage = async (req, res) => {
    try {
      const aboutInfo = await Post.find();  // Fetch all posts from the database
      res.status(200).json({ message: "About info fetched successfully", data: aboutInfo });
    } catch (error) {
      console.error('Error fetching about info:', error);
      res.status(500).json({ message: 'Error fetching about info', error: error.message });
    }
  };
  const deleteAboutMessage = async (req, res) => {
    try {
      const { id } = req.params;
      await Post.findByIdAndDelete(id);  // Delete post by ID
      res.status(200).json({ message: 'About info deleted successfully' });
    } catch (error) {
      console.error('Error deleting about info:', error);
      res.status(500).json({ message: 'Error deleting about info', error: error.message });
    }
  };

module.exports = { Aboutmessage,getAboutMessage ,deleteAboutMessage};
