'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUserMd, FaClipboardList, FaNotesMedical, FaImages, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { FaRegMessage } from "react-icons/fa6";
import AdminDashboard from '../pages/AdminDashboard/page';
import Patient from '../pages/patient/page';
import PatientAppointment from '../pages/patientappointment/page';
import PatientCaseStudies from '../pages/casestudies/page';
import Content from '../pages/content/page';
import Doctor from '../pages/doctor/page';
import AdminInfo from '../pages/Addinfo/page';
import GalleryPage from '../pages/imagegallery/page';
import AddAbout from '../pages/addabout/page';
import Image from '../pages/Image/page';
import FooterForm from '../pages/footerdetail/page';


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
    { name: 'galleryImages', label: 'Gallery Images', icon: <FaImages />},
    { name: 'addAbout', label: 'About', icon: <FaRegMessage /> },
    { name: 'footerform', label: 'Footer Form', icon: <FaRegMessage />}
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
      case 'imageSlider':
        return <Image />
      case 'addAbout':
        return <AddAbout />;
      case 'footerform':
        return <FooterForm />;
      default:
        return <div>Dashboard Content</div>;
    }
  };

  const setSection = (sectionname) => {
    setActiveSection(sectionname);
  };


  const handleBackClick = () => {
    router.push('/');
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
      <div className="col-span-3 bg-white p-4 shadow-lg ">
        <div className="bg-white h-screen fixed top-0 left-0 overflow-y-auto ml-5 w-[20%] rounded-lg mt-2 shadow-xl">
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
          {/* Back Button */}
          <div className="mt-4 text-center mb-4">
            <button
              onClick={handleBackClick}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-9 bg-gray-50 p-6 overflow-y-auto">
        <div className="flex items-center justify-center w-full rounded-lg bg-white shadow-lg p-6">
          <p className="font-bold text-2xl text-green-600 flex items-center">Admin Dashboard</p>
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
