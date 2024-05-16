'use client'
import Link from 'next/link';
import React from 'react';


const Navbar = () => {
  return (
    <>
    <div className='w-full bg-blue-600 sticky top-0 h-[50px]'>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex justify-between items-center h-full'>
          logo
        <ul className='hidden md:flex gap-x-6 text-white'>
          <li>
            <Link href="/Home">
              <p className='hover:text-gray-300'>Home</p>
            </Link>
          </li>
          <li>
            <Link href="/Contact">
              <p className='hover:text-gray-300'>Contact</p>
            </Link>
          </li>
          <li>
            <Link href="/About">
              <p className='hover:text-gray-300'>About Us</p>
            </Link>
          </li>
        </ul>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar
