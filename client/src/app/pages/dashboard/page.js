'use client';
import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import AdminDashboard from '../AdminDashboard/page';






const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  console.log(activeSection,'acc')

  const sections = [
    { id: 'dashboard', label: 'Dashboard'},
    { id: 'device', label: 'Device' },
    { id: 'doctor', label: 'Doctor'},
    { id: 'patient', label: 'Patient' },
    { id: 'doctor-schedule', label: 'Doctor Schedule' },
    { id: 'patient-appointment', label: 'Patient Appointment' },
    { id: 'patient-case-studies', label: 'Patient Case Studies' },
    { id: 'prescription', label: 'Prescription' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <div> <AdminDashboard />  </div>;
      case 'device':
        return <div>Device Content</div>;
      case 'doctor':
        return <div>Doctor Content</div>;
      case 'patient':
        return <div>Patient Content</div>;
      case 'doctor-schedule':
        return <div>Doctor Schedule Content</div>;
      case 'patient-appointment':
        return <div>Patient Appointment Content</div>;
      case 'patient-case-studies':
        return <div>Patient Case Studies Content</div>;
      case 'prescription':
        return <div>Prescription Content</div>;
      default:
        return <div>Dashboard Content</div>;
    }
  };
const setSection=(sectionid)=>{
  setActiveSection(sectionid)
}
  return (
    <div className="h-screen w-full bg-slate-50 grid grid-cols-12">
      <div className="col-span-2 bg-white border border-gray-200">
        <div className="flex flex-col items-center py-6">
         image or logo
          <h2 className="text-lg font-semibold">Super Admin</h2>
        </div>
        <div className="flex flex-col mt-4 space-y-2">
          {sections.map((item, index) => (
            <div
              key={index}
              onClick={() => setSection(item.id)}
              className={`flex items-center p-4 cursor-pointer hover:bg-green-400 ${activeSection === item.id ? 'bg-green-400' : ''}`}
            >
              
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center p-4 cursor-pointer hover:bg-gray-100">
          
          <span>Log Out</span>
        </div>
      </div>
      <div className="col-span-10  bg-slate-100 p-4">
        <div className='flex items-center justify-between w-full rounded-lg bg-white mx-auto px-44 h-[120px]'>
          <p className='-ml-20'>logo</p>
          <ul className='-mr-15'>
            <li >
              <Button className='bg-green-400 font-semibold h-[70px] w-[190px] text-2xl hover:bg-green-200'>chat with us</Button>
            </li>
          </ul>
        </div>
        <div className='bg-transparent w-full h-[100px] mt-4 mb-2  items-center p-6'>
          <h1 className='font-extrabold text-5xl '>{activeSection.replace("-"," ").toUpperCase()}</h1>
        </div>
        <div className='mt-4 px-4 space-x-4 '>
        {renderContent()}
        </div>
      </div>
    </div>
  );
};


// {
//   actu ==== "device" && <></>
//   actu ==== "device" && <></>
//   actu ==== "device" && <></>
// }

export default Dashboard;
