'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/page';
import Footer from '../footer/page';
import axios from 'axios';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch email from localStorage on component mount
  useEffect(() => {
    const storedEmail = JSON.parse(localStorage.getItem('user'))?.email;
    if (storedEmail) {
      setFormData((prevData) => ({ ...prevData, email: storedEmail }));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error message on input change
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!formData.email || !formData.message) {
      setError('Email and message are required.');
      return;
    }

    try {
      // Post feedback to backend
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}feedback`, formData);
      setSuccessMessage(response.data.message);
      setFormData({ email: formData.email, message: '' }); // Clear message after submission, retain email
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <div>
      <Navbar />
      <section className="text-gray-600 body-font relative h-screen">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight="0"
            marginWidth="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=Tinkune,+Kathmandu-32&ie=UTF8&t=&z=14&iwloc=B&output=embed"
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
            <p className="leading-relaxed mb-5 text-gray-600">Send us your Feedback:</p>

            {/* Display success or error messages */}
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            {successMessage && <p className="text-green-500 text-sm mb-3">{successMessage}</p>}

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <button
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default FeedbackPage;
