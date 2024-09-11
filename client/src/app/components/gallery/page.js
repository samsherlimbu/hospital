"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Gallery = () => {
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

  return (
    <div className="p-4 md:p-8">
      <h1 className="font-bold text-center text-3xl mt-2 mb-6">Gallery</h1>
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

          <div className="flex flex-wrap gap-6 justify-center">
            {imagesByTitle[selectedTitle] &&
            imagesByTitle[selectedTitle].length > 0 ? (
              imagesByTitle[selectedTitle].map((image, imgIndex) => (
                <div key={imgIndex} className="relative">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}gallery-image/${image.galleryImage}`}
                    alt={selectedTitle}
                    className="w-60 h-60 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                    onClick={() => handleImageOpen(image)}
                  />
                </div>
              ))
            ) : (
              <p>No images available for this title.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-0 ml-20">
          {Object.keys(imagesByTitle).map((title, index) => (
            <div key={index} className="mb-0">
              {" "}
              {/* Removed margin-bottom */}
              {imagesByTitle[title].slice(0, 1).map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative w-80 h-80 cursor-pointer" // Adjusted width and height
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
