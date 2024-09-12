'use client';

import { Image } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar/page';
import Footer from '../../footer/page';

const Page = ({ params }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    if (params.id) {
      fetchDoctors();
    }
  }, [params.id]);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/usersdoctor/${params.id}`);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-10 text-gray-800">Doctors in Department</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl"
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}doctor-image/${doctor.doctorImage}`}
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
                alt="Doctor Profile"
              />
              <h2 className="text-xl font-bold text-center text-gray-900 mb-2">{doctor.fullName}</h2>
              <p className="text-center text-gray-600 mb-1">{doctor.email}</p>
              <p className="text-center text-gray-600 mb-1">{doctor.phoneNumber}</p>
              <p className="text-center text-gray-600 mb-1 capitalize">{doctor.gender}</p>
              <p className="text-center text-gray-600 mb-1 capitalize">{doctor.status}</p>
              <p className="text-center text-gray-600">{doctor.address}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
