import React from 'react';

const Content = () => {
  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <form>
          <div className="mb-6">
            <label className="font-semibold mb-2 block" htmlFor="message">Message:</label>
            <textarea 
              id="message" 
              name="message" 
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              rows="10"
              placeholder="Enter your message here..."
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="font-semibold mb-2 block" htmlFor="messageFrom">Message From:</label>
            <textarea 
              id="messageFrom" 
              name="messageFrom" 
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              rows="1" 
              placeholder="Director"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="font-semibold mb-2 block" htmlFor="name">Name:</label>
            <input 
              id="name" 
              type="text" 
              name="name" 
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="Enter your name..."
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Content;
