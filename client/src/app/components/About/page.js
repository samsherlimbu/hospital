'use client'
import React, { useState } from 'react'
import Navbar from '../Navbar/page';
import Footer from '../footer/page';


const About = () => {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleItem = (index) => {
      setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };
  return (
    <div className='p-4 '>
        <Navbar/>
    <div className=' h-full p-10 bg-slate-200 shadow-lg rounded-lg mb-3 mt-2'>
      <div className='flex justify-center items-center mt-6 '>
        <h1 className='font-extrabold text-4xl'>About Us</h1>
      </div>
      <div className='px-10 mt-6 '>
      <p>
          The Kantipur Hospital Private Limited was established in 2054 BS with the aim of providing medical treatment to patients using the latest technologies introduced in the medical field. The hospital came into existence through the combined effort and zeal of prominent doctors, renowned social activists, and Kantipur Saving & Credit Co-operative.
        </p>
        <br />
        <p>
          Since its establishment, this hospital has been striving to provide quality healthcare services targeting middle and lower-class people as patients. The hospital prides itself on offering cost-effective and excellent service to its beneficiaries. Currently, it operates with 100 beds in its own building located at Tinkune, Koteshwor, Kathmandu. It offers consultant services, OPD, surgical ward, gynecology, dermatology, urology, orthopedics, ICU, cancer ward, dialysis, and post-operative wards. The hospital also provides 24-hour pharmacy and ambulance services, and privileges to the local people. In cooperation with district health posts, the hospital helps with vaccination for growing children.
        </p>
        <br />
        <p>
          "Prevention is better than cure." Keeping this in mind, Kantipur Hospital focuses on regular health check-up packages. These packages include thorough physical check-ups, and if patients are found to need further tests, they are referred to specialists.
        </p>
        <br />
        <p>
          The Kantipur Hospital Private Limited, established in 2054 BS, aims to provide medical treatment using the latest technologies. The hospital was founded through the combined efforts of prominent doctors, social activists, and Kantipur Saving & Credit Co-operative.
        </p>
        <br />
        <p>
          From the beginning, the hospital has targeted middle and lower-class people, providing quality healthcare services. The hospital takes pride in offering cost-effective and excellent service to its beneficiaries. It operates with 100 beds in its own building located at Tinkune, Koteshwor, Kathmandu, offering consultant services, OPD, surgical ward, gynecology, dermatology, urology, orthopedics, ICU, cancer ward, dialysis, and post-operative wards.
        </p>
        <br />
        <p>
          The hospital provides 24-hour pharmacy and ambulance services and offers privileges to the local community. In cooperation with district health posts, it assists with vaccination for growing children.
        </p>
        <br />
        <p>
          "Prevention is better than cure." With this philosophy, Kantipur Hospital focuses on regular health check-up packages. These packages include thorough physical check-ups, and if patients require further tests, they are referred to specialists.
        </p>
        <br />
        <h1 className='font-extrabold text-orange-600 text-4xl text-center'>BOARD OF DIRECTORS</h1>
        
      <div className="bg-blue-500 text-white mb-2">
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleItem(0)}
        >
          CHAIRMAN
        </div>
        {activeIndex === 0 && (
          <div className="p-4 bg-blue-200 text-black">
            chairman-board-of-director
          </div>
        )}
      </div>
      <div className="bg-blue-500 text-white mb-2">
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleItem(1)}
        >
          MANAGING DIRECTOR
        </div>
        {activeIndex === 1 && (
          <div className="p-4 bg-blue-200 text-black">
            managing-director-board-of-director
          </div>
        )}
      </div>
      <div className="bg-blue-500 text-white mb-2">
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleItem(2)}
        >
          EXECUTIVE DIRECTOR
        </div>
        {activeIndex === 2 && (
          <div className="p-4 bg-blue-200 text-black">
            executive-director-board-of-director
          </div>
        )}
      </div>
      <div className="bg-blue-500 text-white mb-2">
        <div
          className="p-4 cursor-pointer"
          onClick={() => toggleItem(3)}
        >
          MEMBER
        </div>
        {activeIndex === 3 && (
          <div className="p-4 bg-blue-200 text-black">
            member-board-of-director
          </div>
        )}
      </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default About
