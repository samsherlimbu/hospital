'use client';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import AdminDashboard from '../pages/AdminDashboard/page';
import DoctorTable from '../pages/doctor/page';
import Patient from '../pages/patient/page';
import { FaUserMd, FaClipboardList, FaNotesMedical, FaCalendarAlt, FaPrescriptionBottle, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaRegMessage } from "react-icons/fa6";
import DoctorSchedule from '../pages/doctorschedule/page';
import PatientAppointment from '../pages/patientappointment/page';
import PatientCaseStudies from '../pages/casestudies/page';
import Prescription from '../pages/prescription/page';
import Content from '../pages/content/page';
import DepartmentTable from '../components/departmenttable/page';
import Image from '../pages/image/page';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const sections = [
    { name: 'dashboard', label: 'Dashboard', icon: <FaClipboardList /> },
    { name: 'doctor', label: 'Doctor', icon: <FaUserMd /> },
    { name: 'patient', label: 'Patient', icon: <FaUser /> },
    { name: 'doctor-schedule', label: 'Doctor Schedule', icon: <FaCalendarAlt /> },
    { name: 'patient-appointment', label: 'Patient Appointment', icon: <FaNotesMedical /> },
    { name: 'patient-case-studies', label: 'Patient Case Studies', icon: <FaClipboardList /> },
    { name: 'prescription', label: 'Prescription', icon: <FaPrescriptionBottle /> },
    { name: 'Message', label: 'Message', icon: <FaRegMessage /> },
    { name: 'department', label: 'Department' },
    { name: 'Image', label: 'Image' }
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
        return <DoctorSchedule />;
      case 'patient-appointment':
        return <PatientAppointment />;
      case 'patient-case-studies':
        return <PatientCaseStudies />;
      case 'prescription':
        return <Prescription />;
      case 'Message':
        return <Content />;
        case 'Image':
        return <Image />;
      case 'department':
        return <DepartmentTable />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const setSection = (sectionname) => {
    setActiveSection(sectionname);
  };

  return (
    <div className="h-screen w-full bg-slate-50 grid grid-cols-12">
      <div className="col-span-3 bg-white p-4">
        <div className="bg-gray-300 h-screen fixed top-0 left-0 overflow-y-auto items-center ml-5 w-[23%] rounded-lg mt-4">
          <div className="flex flex-col items-center py-6">
            <div>image or logo</div>
            <h2 className="text-lg font-semibold">Super Admin</h2>
          </div>
          <div className="flex flex-col mt-4 space-y-2">
            {sections.map((item, index) => (
              <div
                key={index}
                onClick={() => setSection(item.name)}
                className={`flex items-center p-4 cursor-pointer hover:bg-green-400 ${
                  activeSection === item.name ? 'bg-green-400 text-white' : ''
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
      </div>
      <div className="col-span-9 bg-slate-100 p-4 overflow-y-auto">
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
