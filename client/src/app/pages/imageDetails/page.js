"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const ImageDetails = ({ onCancel }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [hoveringTitle, setHoveringTitle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}get-galleryImage`
        );
        setUploadedImages(res.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  const imagesByTitle = uploadedImages.reduce((acc, image) => {
    if (!acc[image.title]) {
      acc[image.title] = [];
    }
    acc[image.title].push(image);
    return acc;
  }, {});

  const handleMouseEnter = (title) => {
    setHoveringTitle(title);
  };

  const handleMouseLeave = () => {
    setHoveringTitle(null);
  };

  const handleImageClick = (title) => {
    setSelectedTitle(title);
  };

  const handleBack = () => {
    setSelectedTitle(null);
  };

  const handleImageOpen = (image) => {
    setSelectedImage(image);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}delete-galleryImage/${imageId}`
      );
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}get-galleryImage`
      );
      setUploadedImages(res.data);
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  const handleDeleteAllImagesByTitle = async () => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}delete-galleryImagesByTitle/${selectedTitle}`
      );
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}get-galleryImage`
      );
      setUploadedImages(res.data);
      setSelectedTitle(null); // Clear the selected title after deletion
    } catch (error) {
      console.error("Error deleting images by title", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-4xl mx-auto bg-white p-4 rounded-lg shadow-lg">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}gallery-image/${selectedImage.galleryImage}`}
              alt={selectedImage.title}
              className="w-full h-auto max-h-screen object-contain"
            />
            <button
              onClick={handleImageClose}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="w-6 h-6 text-gray-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {selectedTitle ? (
        <div>
          <button
            onClick={handleBack}
            className="mb-4 px-4 py-2 mr-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Back
          </button>
          <button
            onClick={handleDeleteAllImagesByTitle}
            className="mb-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Delete All Images of This Title
          </button>
          <div className="flex flex-wrap gap-6 justify-center">
            {imagesByTitle[selectedTitle] &&
            imagesByTitle[selectedTitle].length > 0 ? (
              imagesByTitle[selectedTitle].map((image, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}gallery-image/${image.galleryImage}`}
                    alt={selectedTitle}
                    className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleImageOpen(image)}
                  />
                  <button
                    onClick={() => handleDeleteImage(image._id)}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="text-center mt-2 text-sm font-medium">
                    {image.title}
                  </div>
                </div>
              ))
            ) : (
              <p>No images available for this title.</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          {Object.keys(imagesByTitle).map((title, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
              <div className="flex flex-wrap gap-6 justify-center">
                {imagesByTitle[title].slice(0, 1).map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="relative w-64 h-64 cursor-pointer"
                    onMouseEnter={() => handleMouseEnter(title)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleImageClick(title)}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}gallery-image/${image.galleryImage}`}
                      alt={title}
                      className="w-full h-full object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105"
                    />
                    {hoveringTitle === title && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold rounded-lg transition-opacity opacity-0 hover:opacity-100">
                        {title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-center">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageDetails;
