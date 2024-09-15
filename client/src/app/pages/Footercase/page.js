'use client';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Footercase = ({ onCancel }) => {
  const [footerData, setFooterData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}getfooter`);
        const data = await response.json();
        setFooterData(data);
      } catch (error) {
        toast.error('Error fetching footer data');
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}footer/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Footer information deleted successfully');
        setFooterData(footerData.filter(item => item._id !== id));
      } else {
        toast.error('Error deleting footer information');
      }
    } catch (error) {
      toast.error('Error deleting footer information');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      <button
        type="button"
        className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition duration-200 mb-3"
        onClick={onCancel}
      >
        Back
      </button>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        footerData.length > 0 ? (
          <ul>
            {footerData.map(item => (
              <li key={item._id} className="mb-4 p-4 bg-white border border-gray-300 rounded-lg">
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Email:</strong> {item.email}</p>
                <p><strong>Emergency:</strong> {item.emergency}</p>
                <p><strong>Blood Bank:</strong> {item.bloodBank}</p>
                <p><strong>Ambulance:</strong> {item.ambulance}</p>
                <p><strong>Appointment:</strong> {item.appointment}</p>
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No footer data available</p>
        )
      )}
    </div>
  );
};

export default Footercase;
