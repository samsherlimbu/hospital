'use client';
import React, { useState } from 'react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { FaUserMd, FaClipboardList, FaNotesMedical, FaImages, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaRegMessage } from "react-icons/fa6";
import AdminDashboard from '../pages/AdminDashboard/page';
import Patient from '../pages/patient/page';
import PatientAppointment from '../pages/patientappointment/page';
import PatientCaseStudies from '../pages/casestudies/page';
import Content from '../pages/content/page';
import DepartmentTable from '../components/departmenttable/page';
import Details from '../pages/doctordetails/page';
import Doctor from '../pages/doctor/page';
import AdminInfo from '../pages/Addinfo/page';
import GalleryPage from '../pages/imagegallery/page';
import AddAbout from '../pages/addabout/page';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const router = useRouter();

  const sections = [
    { name: 'dashboard', label: 'Dashboard', icon: <FaClipboardList /> },
    { name: 'doctor', label: 'Doctor', icon: <FaUserMd /> },
    { name: 'patient', label: 'Patient', icon: <FaUser /> },
    { name: 'Admin-user', label: 'Admin User', icon: <FaUser /> },
    { name: 'patient-appointment', label: 'Patient Appointment', icon: <FaNotesMedical /> },
    { name: 'patient-case-studies', label: 'Patient Case Studies', icon: <FaClipboardList /> },
    { name: 'Message', label: 'Message', icon: <FaRegMessage /> },
    { name: 'department', label: 'Department', icon: <FaUserMd /> },
    { name: 'Doctor', label: 'DoctorDetails', icon: <FaUserMd /> },
    { name: 'galleryImages', label: 'Gallery Images', icon: <FaImages />},
    { name: 'addAbout', label: 'About', icon: <FaRegMessage /> },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'doctor':
        return <Doctor />;
      case 'patient':
        return <Patient />;
      case 'Admin-user':
        return <AdminInfo />;
      case 'patient-appointment':
        return <PatientAppointment />;
      case 'patient-case-studies':
        return <PatientCaseStudies />;
      case 'Message':
        return <Content />;
      case 'galleryImages':
        return <GalleryPage />;
      case 'department':
        return <DepartmentTable />;
      case 'Doctor':
        return <Details />;
        case 'addAbout':
          return <AddAbout />;
      
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const setSection = (sectionname) => {
    setActiveSection(sectionname);
  };

  const handleChatClick = () => {
    router.push('/pages/chat');
  };

  const isAdmin = JSON.parse(localStorage.getItem("user"))?.isAdmin;

  if (isAdmin === false) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-3xl font-bold">
        UNAUTHORIZED !!!
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-gray-100 grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-3 bg-white p-4 shadow-lg">
        <div className="bg-white h-screen fixed top-0 left-0 overflow-y-auto ml-5 w-[20%] rounded-lg mt-4 shadow-xl">
          <div className="flex flex-col items-center py-6">
            <div className="mb-4">
              <img src="/logo.png" alt="Logo" className="h-12 w-12 rounded-full" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Super Admin</h2>
          </div>
          <div className="flex flex-col mt-6 space-y-4">
            {sections.map((item, index) => (
              <div
                key={index}
                onClick={() => setSection(item.name)}
                className={`flex items-center p-4 cursor-pointer rounded-lg hover:bg-green-400 transition-all duration-300 ${
                  activeSection === item.name ? 'bg-green-500 text-white' : 'text-gray-600'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="text-lg font-medium">{item.label}</span>
              </div>
            ))}
          </div>
          <div
            className="mt-auto flex items-center p-4 cursor-pointer hover:bg-gray-100 rounded-lg"
            onClick={() => alert('Logged out')}
          >
            <FaSignOutAlt className="mr-2" />
            <span>Log Out</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-9 bg-gray-50 p-6 overflow-y-auto">
        <div className="flex items-center justify-between w-full rounded-lg bg-white shadow-lg p-6">
          <p className="font-bold text-2xl text-green-600">Admin Dashboard</p>
          <Button
            className="bg-green-500 text-white font-semibold py-3 px-6 rounded-full hover:bg-green-400 transition duration-300"
            onClick={handleChatClick}
          >
            Chat with us
          </Button>
        </div>

        <div className="bg-gradient-to-r from-green-300 to-green-500 rounded-lg mt-6 p-6">
          <h1 className="font-bold text-4xl text-white">
            {activeSection.replace('-', ' ').toUpperCase()}
          </h1>
        </div>

        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
