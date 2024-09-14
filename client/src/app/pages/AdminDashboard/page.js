'use client'
import React from 'react';
import { useSelector } from 'react-redux';
import { FaHospital, FaUserMd, FaUserInjured, FaCalendarCheck, FaFileMedical } from 'react-icons/fa'; // Example icons

const sidebar = [
  { label: 'Department', count: 'departments', icon: <FaHospital /> },
  { label: 'Doctor', count: 'doctors', icon: <FaUserMd /> },
  { label: 'Patient', count: 'patients', icon: <FaUserInjured /> },
  { label: 'Patient Appointment', count: 'appointments', icon: <FaCalendarCheck /> },
  { label: 'Patient Case Studies', count: 'case', icon: <FaFileMedical /> },
  { label: 'Admin', count: 'admin', icon: <FaUserInjured /> },
];

const AdminDashboard = () => {
  const doctors = useSelector((state) => state.doctor.doctors); // Accessing doctors from Redux
  const patients = useSelector((state) => state.form.patients); // Accessing patients from Redux
  const appointments = useSelector((state) => state.appointments.Appointments);
  const departments = [...new Set(doctors.map((doctor) => doctor.department))]
  const caseStudies = useSelector((state) => state.case.case); // Accessing case studies from Redux
  const admins = useSelector((state) => state.admin.admins); // Accessing admins from Redux

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {sidebar.map((side, index) => (
        <div
          key={index}
          className="flex h-[140px] w-full sm:w-[280px] space-x-4 rounded-xl bg-gradient-to-r from-blue-100 to-blue-300 p-6 shadow-lg justify-between items-center transition-transform transform hover:scale-105 hover:shadow-xl"
        >
          <div className="flex flex-col">
            <p className="text-gray-600 text-sm md:text-base lg:text-lg font-medium">{side.label}</p>
            {/* Dynamically show the count */}
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
              {side.count === 'doctors' ? doctors.length :
               side.count === 'patients' ? patients.length :
               side.count === 'appointments'? appointments.length:
               side.count === 'departments' ? departments.length:
               side.count === 'case' ? caseStudies.length:
               side.count === 'admin'? admins.length:
                0}
            </p>
          </div>
          <div className="text-blue-600 bg-blue-200 p-3 rounded-full">
            {React.cloneElement(side.icon, { size: 40 })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
