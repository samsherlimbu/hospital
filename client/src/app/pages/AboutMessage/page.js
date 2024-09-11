'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AboutMessage = ({ onCancel }) => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}getAboutMessage`);
        console.log("Response data:", response.data.data);
        setAboutData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}getAboutMessage/${id}`);
      setAboutData(aboutData.filter(item => item._id !== id)); // Remove deleted item from UI
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatText = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-4">
      {aboutData.length > 0 ? (
        aboutData.map((item) => (
          <div key={item._id} className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-lg font-bold">
            {formatText(item.aboutText)}
                </h2>
            <div className="flex justify-between items-center mt-2">
              <button 
                onClick={() => handleDelete(item._id)} 
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No about Message available.</p>
      )}

      <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg">
        Cancel
      </button>
    </div>
  )
}

export default AboutMessage
