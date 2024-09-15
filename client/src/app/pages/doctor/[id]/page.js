'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Info = ({ params }) => {
  const [doctor, setDoctor] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}usersdoctor/${params.id}`);
        console.log('doctor data:', data); // Debugging log
        setDoctor(data);  // Adjusted based on the response structure
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };

    fetchDoctor();
  }, [params.id]);

  if (!doctor) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Doctor Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <div className="mb-4 ">
          <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>
          <div className="mt-2">
            <p className="text-gray-600"><strong>Name:</strong> {doctor.fullName}</p>
            <p className="text-gray-600"><strong>Email:</strong> {doctor.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {doctor.phoneNumber}</p>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">Address</h2>
          <p className="text-gray-600">{doctor.address}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-700">Additional Details</h2>
          <p className="text-gray-600"><strong>Department:</strong> {doctor.department}</p>
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
