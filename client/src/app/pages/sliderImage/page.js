"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Slider = ({ onCancel }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}get-sliderImage`
        );
        setUploadedImages(res.data);
      } catch (error) {
        console.error("Error fetching images", error);
      }
    };

    fetchImages();
  }, []);

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}delete-sliderImage/${imageId}`
      );
      const updatedImages = uploadedImages.filter(
        (image) => image._id !== imageId
      );
      setUploadedImages(updatedImages);
    } catch (error) {
      console.error("Error deleting image", error);
    }
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-wrap gap-6 justify-center">
        {uploadedImages.length > 0 ? (
          uploadedImages.map((image, imgIndex) => (
            <div key={imgIndex} className="relative">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}slider-image/${image.sliderImage}`}
                alt={image.title}
                className="w-64 h-64 object-cover rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
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
          <p>No images available.</p>
        )}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Slider;
