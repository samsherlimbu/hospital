const mongoose = require("mongoose");

// Define the PostMessage schema
const AboutUsSchema = new mongoose.Schema(
  {
    aboutText: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the model
const AboutUs = mongoose.model("AboutUs", AboutUsSchema);

module.exports = AboutUs;
