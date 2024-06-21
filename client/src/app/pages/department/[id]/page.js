'use client';

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
      const { data } = await axios.get(`http://localhost:8000/usersdoctor/${params.id}`);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div>
      <h1>Doctors in Department</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="bg-red-300 p-4 rounded">
            <h2>{doctor.fullName}</h2>
            <p>{doctor.email}</p>
            <p>{doctor.phoneNumber}</p>
            <p>{doctor.gender}</p>
            <p>{doctor.status}</p>
            <p>{doctor.address}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
