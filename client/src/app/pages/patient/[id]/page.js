'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Info = ({ params }) => {
  const [patient, setPatient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users/${params.id}`);
        console.log('patient data:', data); // Debugging log
        setPatient(data.data); // Adjusted based on the response structure
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatient();
  }, [params.id]);

  if (!patient) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center mt-3 ">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Patient Details</h1>
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-4xl text-center bg-slate-100">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">Basic Information</h2>
          <div className="mt-2">
            <p className="text-gray-600"><strong>Name:</strong> {patient.fullName}</p>
            <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {patient.phoneNumber}</p>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-700">Address</h2>
          <p className="text-gray-600">{patient.address}</p>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-700">Additional Details</h2>
          <p className="text-gray-600"><strong>Gender:</strong> {patient.gender}</p>
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
