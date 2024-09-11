import axios from "axios";
import React, { useState } from "react";
import Aboutinfo from "../Aboutinfo/page";
import AboutMessage from "../AboutMessage/page";
import toast from "react-hot-toast";

const AddAbout = ({onCancel}) => {
  // State to store form values
  const [aboutText, setAboutText] = useState('');
  const [post, setPost] = useState('');
  const [name, setName] = useState('');
  const [showcase, setShowcase] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        // Use the correct variable name
        post,
        name,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}About`, data);
      toast("Added successfully!");
      // Clear the form or handle success here
      setPost(''); // Clear the input
      setName(''); // Clear the input
    } catch (error) {
      console.error("Error adding about us content:", error);
    }
  };
  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const data = {
        // Use the correct variable name
        aboutText,
      };
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}AboutMessage`, data);
      toast("Added successfully!");
      // Clear the form or handle success here
      setAboutText(''); // Clear the text area
       // Clear the input
    } catch (error) {
      console.error("Error adding about us content:", error);
    }
  };

  return (
    <>
   <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mb-5">
  {/* Form for About Us */}
  {showcase ? (
    <Aboutinfo onCancel={() => setShowcase(false)} />
  ) : (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Static Input Fields */}
      <div className="space-y-2">
        <div>
          <button
            onClick={() => setShowcase(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            AboutInfo
          </button>
        </div>
        <label className="block text-lg font-semibold text-gray-700">
          Post
        </label>
        <input
          type="text"
          placeholder="Enter Post"
          value={post}
          onChange={(e) => setPost(e.target.value.toUpperCase())}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="block text-lg font-semibold text-gray-700">
          Name
        </label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
      >
        Submit
      </button>
    </form>
  )}
</div>

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {showcase ?(
        <AboutMessage onCancel={()=>setShowcase(false)}/>
      ):(
        <form onSubmit={handleMessage} className="space-y-4">
          <div>
              <button
                onClick={() => setShowcase(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                AboutMessage
              </button>
            </div>
      <label className="block text-lg font-semibold text-gray-700">
          About us
        </label>
        <textarea
          name="aboutText"
          rows="4"
          placeholder="Write about us..."
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
         <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Submit
        </button>
      </form>)}
        
      

      </div>
      </>
    
  );
};

export default AddAbout;
