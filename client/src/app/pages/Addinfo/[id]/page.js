'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Info = ({ params }) => {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}getAdmin/${params.id}`);
        console.log('Admin data:', data); // Debugging log
        setAdmin(data.data);
      } catch (error) {
        console.error('Error fetching admin details:', error);
      }
    };

    fetchAdmin();
  }, [params.id]);

  if (!admin) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
     
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Admin Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>
          <div className="mt-2">
            <p className="text-gray-600"><strong>Name:</strong> {admin.fullName}</p>
            <p className="text-gray-600"><strong>Email:</strong> {admin.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {admin.phoneNumber}</p>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">Address</h2>
          <p className="text-gray-600">{admin.address}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-700">Additional Details</h2>
          <p className="text-gray-600"><strong>Gender:</strong> {admin.gender}</p>
        </div>
        <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back
      </button>
      </div>
    </div>
  );
};

export default Info;
