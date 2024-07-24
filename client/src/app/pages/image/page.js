'use client'
import React, { useState } from 'react';

const Image = () => {
  const [frontPageImage, setFrontPageImage] = useState(null);
  const [doctorImage, setDoctorImage] = useState(null);
  const [frontPageFile, setFrontPageFile] = useState(null);
  const [doctorFile, setDoctorFile] = useState(null);

  const handleFrontPageImageChange = (e) => {
    const file = e.target.files[0];
    if (frontPageImage) URL.revokeObjectURL(frontPageImage);
    setFrontPageImage(URL.createObjectURL(file));
    setFrontPageFile(file);
    console.log('Front Page Image selected:', file);
  };

  const handleDoctorImageChange = (e) => {
    const file = e.target.files[0];
    if (doctorImage) URL.revokeObjectURL(doctorImage);
    setDoctorImage(URL.createObjectURL(file));
    setDoctorFile(file);
    console.log('Doctor Image selected:', file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('frontImage', frontPageFile);
    formData.append('doctorImage', doctorFile);

    try {
      const response = await fetch("http://localhost:8000/uploadimage", {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        console.log('Form submitted');
      } else {
        alert('Failed to submit form');
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className='w-full p-4 bg-gray-100 min-h-screen flex justify-center items-center'>
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-6 text-center">
            <label className="font-semibold mb-2 block" htmlFor="frontPageImage">Front Page Image:</label>
            <input 
              type="file" 
              id="frontPageImage" 
              onChange={handleFrontPageImageChange} 
              className="hidden"
            />
            
            <label 
              htmlFor="frontPageImage" 
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Choose Image
            </label>
            {frontPageImage && <img src={frontPageImage} alt="Front Page preview" className="mt-4 w-32 h-32 object-cover rounded-md mx-auto" />}
          </div>
          <div className="mb-6 text-center">
            <label className="font-semibold mb-2 block" htmlFor="doctorImage">Doctor Image</label>
            <input 
              type="file" 
              id="doctorImage" 
              onChange={handleDoctorImageChange} 
              className="hidden"
            />
            <label 
              htmlFor="doctorImage" 
              className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Choose Image
            </label>
            {doctorImage && <img src={doctorImage} alt="Doctor preview" className="mt-4 w-32 h-32 object-cover rounded-md mx-auto" />}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Image;
