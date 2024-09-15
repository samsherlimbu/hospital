"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Fetch images on component mount
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

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % uploadedImages.length);
    }, 5000);
    return () => clearInterval(slideInterval); // Clear interval on component unmount
  }, [uploadedImages.length]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % uploadedImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + uploadedImages.length) % uploadedImages.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden group">
      <div
        className="flex transition-transform ease-in-out duration-700"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {uploadedImages.map((image, index) => (
          <div key={index} className="min-w-full h-[500px] relative">
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}slider-image/${image.sliderImage}`}
              alt={image.description}
              className="w-full h-full object-cover"
            />
            {/* Background Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60"></div>
            
            {/* Advanced Description */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <div
                className="bg-black bg-opacity-60 p-4 rounded-lg shadow-lg transition-opacity duration-500 ease-in-out transform hover:scale-105"
              >
                <h2 className="text-3xl font-bold mb-2 animate-fade-in text-center">Kantipur Hospital</h2>
                <p className="text-lg font-medium mb-2 opacity-90 text-center">
                  {image.description || "No description provided"}
                </p>
               
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 left-4 transform -translate-y-1/2 p-4 text-white bg-black bg-opacity-50 rounded-full transition hover:bg-opacity-80"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 right-4 transform -translate-y-1/2 p-4 text-white bg-black bg-opacity-50 rounded-full transition hover:bg-opacity-80"
      >
        &#10095;
      </button>

      {/* Dots/Pagination */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {uploadedImages.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full bg-white ${currentSlide === index ? 'opacity-100' : 'opacity-50'} transition-opacity duration-300`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
