'use client';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import AdminDashboard from '../AdminDashboard/page';
import DoctorTable from '../doctor/page';
import Patient from '../patient/page';
import { FaUserMd, FaClipboardList, FaNotesMedical, FaCalendarAlt, FaStethoscope, FaPrescriptionBottle, FaUser, FaSignOutAlt } from 'react-icons/fa';
import DoctorSchedule from '../doctorschedule/page';
import PatientAppointment from '../patientappointment/page';
import PatientCaseStudies from '../casestudies/page';
import Prescription from '../prescription/page';




const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaClipboardList /> },
    { id: 'doctor', label: 'Doctor', icon: <FaUserMd /> },
    { id: 'patient', label: 'Patient', icon: <FaUser /> },
    { id: 'doctor-schedule', label: 'Doctor Schedule', icon: <FaCalendarAlt /> },
    { id: 'patient-appointment', label: 'Patient Appointment', icon: <FaNotesMedical /> },
    { id: 'patient-case-studies', label: 'Patient Case Studies', icon: <FaClipboardList /> },
    { id: 'prescription', label: 'Prescription', icon: <FaPrescriptionBottle /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'doctor':
        return <DoctorTable />;
      case 'patient':
        return <Patient />;
      case 'doctor-schedule':
        return <div><DoctorSchedule/></div>;
      case 'patient-appointment':
        return <div><PatientAppointment/></div>;
      case 'patient-case-studies':
        return <div><PatientCaseStudies/></div>;
      case 'prescription':
        return <div><Prescription/></div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const setSection = (sectionId) => {
    setActiveSection(sectionId);
  };

  return (
    <div className="h-screen w-full bg-slate-50 grid grid-cols-12">
      <div className="col-span-2 bg-white border-r border-gray-200 overflow-y-auto h-full">
        <div className="flex flex-col items-center py-6">
          <div>image or logo</div>
          <h2 className="text-lg font-semibold">Super Admin</h2>
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          {sections.map((item, index) => (
            <div
              key={index}
              onClick={() => setSection(item.id)}
              className={`flex items-center p-4 cursor-pointer hover:bg-green-400 ${
                activeSection === item.id ? 'bg-green-400 text-white' : ''
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center p-4 cursor-pointer hover:bg-gray-100" onClick={() => alert('Logged out')}>
          <FaSignOutAlt className="mr-2" />
          <span>Log Out</span>
        </div>
      </div>
      <div className="col-span-10 bg-slate-100 p-4 overflow-y-auto">
        <div className="flex items-center justify-between w-full rounded-lg bg-white mx-auto px-44 h-[120px]">
          <p className="-ml-20">logo</p>
          <ul className="-mr-15">
            <li>
              <Button className="bg-green-400 font-semibold h-[70px] w-[190px] text-2xl hover:bg-green-200">
                chat with us
              </Button>
            </li>
          </ul>
        </div>
        <div className="bg-transparent w-full h-[100px] mt-4 mb-2 items-center p-6">
          <h1 className="font-extrabold text-5xl">{activeSection.replace("-", " ").toUpperCase()}</h1>
        </div>
        <div className="mt-4 px-4 space-x-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

// {
//   actu ==== "device" && <></>
//   actu ==== "device" && <></>
//   actu ==== "device" && <></>
// 