'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';
import ImageDetails from '../imageDetails/page';

const GalleryPage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [showCase, setShowCase] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);

    for (let i = 0; i < selectedFiles.length; i++) {
      data.append('galleryImage', selectedFiles[i]);
    }

    try {
      const response = await axios.post('http://localhost:8000/galleryImage', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadedImages(response.data.data);
      setShowCase(true);
    } catch (error) {
      console.error('Error uploading images', error);
    }
  };

  return (
    <>
      {showCase ? (
        <ImageDetails 
          onCancel={() => setShowCase(false)}  // Trigger to hide the ImageDetails component
         
        />
      ) : (
        <div className="p-8 bg-gray-100 min-h-screen">
             <div>
              <button
                onClick={() => setShowCase(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Image Details
              </button>
            </div>
          <h1 className="text-3xl font-bold text-center mb-6">Upload Gallery Images</h1>

          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={handleTitleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter image title"
                  />
                </div>
                <div>
                  <label htmlFor="galleryImage" className="block text-sm font-medium text-gray-700">Upload Images</label>
                  <input
                    type="file"
                    id="galleryImage"
                    name="galleryImage"
                    multiple
                    onChange={handleFileChange}
                    accept="image/*"
                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaUpload className="mr-2" />
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default GalleryPage;
