const mongoose = require("mongoose");

// Define the Post schema
const PostSchema = new mongoose.Schema(
  {
    
    post: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
