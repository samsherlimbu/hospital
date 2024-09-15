'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPhone, faAmbulance, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}getfooter`);
        if (!response.ok) throw new Error('Failed to fetch footer data');
        const data = await response.json();
        setFooterData(data[0]); // Assuming you want the first entry
      } catch (error) {
        toast.error('Error fetching footer data');
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);

  if (loading) return <p className='text-center py-4'>Loading...</p>;
  if (!footerData) return <p className='text-center py-4'>No footer data available</p>;

  return (
    <footer className='bg-blue-200 w-full mt-2 rounded-lg'>
      <div className='w-full mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 rounded-lg shadow-lg p-8 md:p-16'>
        
        {/* Logo Section */}
        <div className='flex flex-col items-center md:items-start'>
          <Image 
            src='/logo.png' 
            alt='Logo' 
            width={250} 
            height={250} 
            priority={true} 
            className='mb-4'
          />
        </div>
        
        {/* Address and Contact Section */}
        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
          <p className='font-bold text-lg mb-2'>📍 Address</p>
          <p className='mb-4'>{footerData.address}</p>
          
          <p className='font-bold text-lg mb-2'>📧 Email</p>
          <p className='mb-4'>{footerData.email}</p>
          
          <p className='font-bold text-lg mb-2 flex items-center'>
            <FontAwesomeIcon icon={faPhone} className='mr-2' />
            Emergency: {footerData.emergency}
          </p>
          <p className='font-bold text-lg mb-2 flex items-center'>
            <FontAwesomeIcon icon={faHeart} className='mr-2' />
            Blood bank: {footerData.bloodBank}
          </p>
          <p className='font-bold text-lg mb-2 flex items-center'>
            <FontAwesomeIcon icon={faAmbulance} className='mr-2' />
            Ambulance: {footerData.ambulance}
          </p>
          <p className='font-bold text-lg mb-2 flex items-center'>
            <FontAwesomeIcon icon={faCalendarAlt} className='mr-2' />
            Appointment: {footerData.appointment}
          </p>
        </div>
        
        {/* Links and Developer Info */}
        <div className='flex flex-col items-center md:items-end text-center md:text-right'>
          <Link href="/components/service" className='mt-2 text-blue-800 hover:underline'>🔗 Our Services</Link>
          <Link href="/components/About" className='mt-2 text-blue-800 hover:underline'>🔗 About Us</Link>
          <Link href="/components/contact" className='mt-2 text-blue-800 hover:underline'>🔗 Contact Us</Link>
          <p className='mt-4 font-bold'>Developed By</p>
          <p>InBox I.T. Solutions Pvt. Ltd</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
