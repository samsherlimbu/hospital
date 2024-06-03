'use client'
import Image from 'next/image'
import React from 'react'

const Footer = () => {

  
  return (
    <footer className='bg-gray-400 w-full  mt-2 rounded-lg'>
      <div className='container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 rounded-lg shadow-lg p-8'>
        
    
        <div className='flex flex-col items-center md:items-start'>
          <Image src='/path/to/logo.png' alt='Kantipur Hospital Logo' width={150} height={50} />
          <p className='mt-4'>&copy; 2021 All Rights Reserved</p>
        </div>
        
    
        <div className='flex flex-col items-center'>
          <p className='font-bold'>📍 Address</p>
          <p>GardenChowk pepsicola, Kathmandu, Nepal</p>
          <p className='font-bold mt-4'>📧 Email</p>
          <p>kantipurhospital@gmail.com</p>
          <p className='font-bold mt-4'>📞 Emergency: +977-01-4111858</p>
          <p>Blood bank: +977-01-4111692</p>
          <p className='font-bold mt-4'>🚑 Ambulance: +977-01-4111627</p>
          <p className='font-bold mt-4'>📅 Appointment: +977-01-4111858</p>
          <div className='flex space-x-4 mt-4'>
            <button className='bg-blue-600 text-white py-2 px-4 rounded'>Facebook</button>
            <button className='bg-blue-400 text-white py-2 px-4 rounded'>Twitter</button>
          </div>
        </div>
        
        {/* Right Section */}
        <div className='flex flex-col items-center md:items-end'>
          <p className='font-bold'>🔗 Doctors</p>
          <p className='mt-2'>🔗 Our Services</p>
          <p className='mt-2'>🔗 Careers</p>
          <p className='mt-2'>🔗 About Us</p>
          <p className='mt-2'>🔗 Contact Us</p>
          <p className='mt-4'>Developed By</p>
          <p>InBox I.T. Solutions Pvt. Ltd</p>
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
