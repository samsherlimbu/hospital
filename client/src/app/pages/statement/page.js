'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Footer from '@/app/components/footer/page';
import Navbar from '@/app/components/Navbar/page';

const Page = () => {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();
  const userEmail = JSON.parse(localStorage.getItem('user'))?.email;

  useEffect(() => {
    // Fetch appointments from the server
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}appointments`);
        // Filter appointments based on user email
        const filteredAppointments = response.data.filter(app => app.email === userEmail);
        setAppointments(filteredAppointments);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, [userEmail]);

  const handleChange = () => {
    router.push('/pages/Appointment');
  };

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-800">Appointment Report</h1>

      {['pending', 'accepted'].map(status => (
        <div key={status} className="mb-10">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <h2 className={`text-2xl font-semibold mb-6 p-4 ${status === 'pending' ? 'bg-yellow-100' : status === 'accepted' ? 'bg-green-100' : 'bg-red-100'} capitalize`}>
              {status} Appointments
            </h2>
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-700">Doctor</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="py-3 px-6 border-b-2 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.filter(app => app.status === status).map((appointment, index) => (
                  <tr key={index} className="hover:bg-gray-100 transition duration-200">
                    <td className="py-4 px-6 border-b text-gray-800">{appointment.name}</td>
                    <td className="py-4 px-6 border-b text-gray-800">{appointment.email}</td>
                    <td className="py-4 px-6 border-b text-gray-800">{appointment.doctor}</td>
                    <td className="py-4 px-6 border-b text-gray-800">{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                    <td className={`py-4 px-6 border-b font-semibold ${status === 'pending' ? 'text-yellow-600' : status === 'accepted' ? 'text-green-600' : 'text-red-600'}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {appointments.filter(app => app.status === status).length === 0 && (
              <p className="text-gray-500 mt-6 px-4 pb-4">No {status} appointments.</p>
            )}
          </div>
        </div>
      ))}
      
      <div className="text-center">
        <button
          type="button"
          className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105 duration-300"
          onClick={handleChange}
        >
          Back
        </button>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Page;
