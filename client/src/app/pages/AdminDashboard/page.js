'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { FaHospital, FaUserMd, FaUserInjured, FaCalendarCheck, FaFileMedical, FaPrescriptionBottleAlt } from 'react-icons/fa'; // Example icons

const sidebar = [
  { label: 'Department', count: 0, icon: <FaHospital /> },
  { label: 'Doctor', count: 'doctors', icon: <FaUserMd /> },
  { label: 'Patient', count: 'patients', icon: <FaUserInjured /> },
  { label: 'Patient Appointment', count: 0, icon: <FaCalendarCheck /> },
  { label: 'Patient Case Studies', count: 0, icon: <FaFileMedical /> },
];

const AdminDashboard = () => {
  const doctors = useSelector((state) => state.doctor.doctors); // Accessing doctors from Redux
  const patients = useSelector((state) => state.form.patients); // Accessing patients from Redux

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
      {sidebar.map((side, index) => (
        <div
          key={index}
          className="flex h-[120px] w-full sm:w-[280px] space-x-4 rounded-xl bg-white p-5 shadow-lg justify-between items-center mb-6 transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm md:text-base lg:text-lg">{side.label}</p>
            {/* Dynamically show the count */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
              {side.count === 'doctors' ? doctors.length : side.count === 'patients' ? patients.length : 0}
            </p>
          </div>
          <div className="text-blue-600 text-3xl md:text-4xl lg:text-5xl">
            {side.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
