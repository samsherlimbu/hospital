'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

const PatientDetails = ({ params }) => {
  const [patient, setPatient] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Patient-cases/${params.id}`);
        setPatient(data.data);
      } catch (error) {
        console.error('Error fetching patient case details:', error);
      }
    };

    fetchCase();
  }, [params.id]);

  if (!patient) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-3xl">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 border-b-2 border-blue-500 pb-2">Patient Details</h2>
          <div className="flex flex-col space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">Patient Information</h3>
              <p className="text-gray-600"><strong>Name:</strong> {patient.patient}</p>
              <p className="text-gray-600"><strong>Email:</strong> {patient.email}</p>
              <p className="text-gray-600"><strong>Department:</strong> {patient.department}</p>
              <p className="text-gray-600"><strong>Doctor:</strong> {patient.doctor}</p>
              <p className="text-gray-600"><strong>Created At:</strong> {format(new Date(patient.createdAt), 'dd MMM yyyy')}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold">Diseases</h3>
              {patient.diseases.length ? (
                <ul className="list-disc pl-5">
                  {patient.diseases.map((disease, idx) => (
                    <li key={disease._id} className="text-gray-600">{disease.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">No diseases listed.</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end p-6 bg-gray-50 border-t border-gray-200">
          <button
            onClick={() => router.back()}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
