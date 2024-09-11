'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Aboutinfo = ({ onCancel }) => {
  const [aboutData, setAboutData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}AboutInfo`);
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
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}AboutInfo/${id}`);
      setAboutData(aboutData.filter(item => item._id !== id)); // Remove deleted item from UI
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Group by post field
  const groupedData = aboutData.reduce((acc, item) => {
    if (!acc[item.post]) {
      acc[item.post] = [];
    }
    acc[item.post].push(item);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-4">
      {Object.keys(groupedData).length > 0 ? (
        Object.entries(groupedData).map(([post, items]) => (
          <div key={post} className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-lg font-bold">{post}</h2>
            {items.map(item => (
              <div key={item._id}>
                <h3 className="text-md font-semibold">{item.name}</h3>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2">
              <button 
                onClick={() => handleDelete(items[0]._id)} 
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No about info available.</p>
      )}

      <button onClick={onCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg">
        Cancel
      </button>
    </div>
  )
}

export default Aboutinfo
