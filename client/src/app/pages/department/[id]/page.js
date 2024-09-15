'use client';

import Footer from '@/app/components/footer/page';
import Navbar from '@/app/components/Navbar/page';
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
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}departments/${params.id}`);
      console.log(data);
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-12 px-4 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
          Meet Our Doctors
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative flex items-center justify-center h-56">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}doctor-image/${doctor.doctorImage}`}
                  width={200}
                  height={200}
                  className="object-cover rounded-t-lg mb-4"
                  alt={doctor.fullName}
                />
                
              </div>
              <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-3">
                  {doctor.fullName}
                </h2>
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> {doctor.phoneNumber}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Department:</strong> {doctor.department}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {doctor.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
