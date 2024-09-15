'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Ensure you are using next/image for optimized images
import Navbar from '../../Navbar/page';
import Footer from '../../footer/page';

const Info = ({ params }) => {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}departments/${params.id}`);
        console.log('doctors:', data); // Debugging log
        setDoctors(data); // Data is now an array of doctor objects
      } catch (error) {
        console.error('Error fetching doctors details:', error);
      }
    };

    fetchDoctors();
  }, [params.id]);

  if (doctors.length === 0) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6 flex flex-col items-center">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Doctors in Department</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <img
                src={`${process.env.NEXT_PUBLIC_API_URL}doctor-image/${doctor.doctorImage}`}
                alt={doctor.fullName}
                width={150}
                height={150}
                className=" mx-auto mb-4"
              />
            </div>
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-gray-700">{doctor.fullName}</h2>
              <p className="text-gray-600"><strong>Email:</strong> {doctor.email}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {doctor.phoneNumber}</p>
            </div>
            <div className="mb-4 text-center">
              <h2 className="text-xl font-bold text-gray-700">Address</h2>
              <p className="text-gray-600">{doctor.address}</p>
            </div>
            <div className='text-center'>
              <h2 className="text-xl font-bold text-gray-700 ">Department</h2>
              <p className="text-gray-600">{doctor.department}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => router.back()}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back
      </button>
    </div>
    <Footer />
    </>
  );
};

export default Info;
