'use client'
import React from 'react'
import { useState, useEffect } from 'react';

const images = [
  "/first.png",
  "/second.png",
  "/third.png",
  "/fourth.png",
];
const ImageSlider=()=> {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-100 overflow-hidden">
      <div className="flex transition-transform ease-in-out duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {images.map((src, index) => (
          <div key={index} className="min-w-full h-80 relative">
            <img src={src} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center bg-gray-500 bg-opacity-50 p-4 rounded">
              <h2 className="text-2xl font-bold">KANTIPUR</h2>
              <p className="text-lg">International Hospital</p>
              <p className="text-sm">A hospital may be a place of illness, but it's also a place of healing, hope, and humanity</p>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} className="absolute top-1/2 left-0 transform -translate-y-1/2 p-4 text-white bg-black bg-opacity-50 rounded-r">
        &#10094;
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-0 transform -translate-y-1/2 p-4 text-white bg-black bg-opacity-50 rounded-l">
        &#10095;
      </button>
    </div>
  );
}

export default ImageSlider;