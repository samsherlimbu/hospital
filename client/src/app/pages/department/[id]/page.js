'use client';

import { Image } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (params.id) {
      fetchDoctors();
    }
  }, [params.id]);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}usersdoctor/${params.id}`);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Doctors in Department</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div 
            key={doctor._id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative flex items-center justify-center h-48">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}doctor-image/${doctor.doctorImage}`}
                width={300}
                height={300}
                className="object-cover rounded-t-lg"
                alt={doctor.fullName}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-t-lg">
                <div className="text-center text-white text-lg font-semibold">
                  {doctor.fullName}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{doctor.fullName}</h2>
              <p className="text-gray-600 mb-1"><strong>Email:</strong> {doctor.email}</p>
              <p className="text-gray-600 mb-1"><strong>Phone:</strong> {doctor.phoneNumber}</p>
              <p className="text-gray-600 mb-1"><strong>Gender:</strong> {doctor.gender}</p>
              <p className="text-gray-600 mb-1"><strong>Status:</strong> {doctor.status}</p>
              <p className="text-gray-600"><strong>Address:</strong> {doctor.address}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
