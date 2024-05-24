'use client'
import { User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [userIconClicked, setUserIconClicked] = useState(false);
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const handleMouseEnter = (Menu) => {
    setShowDropdown(Menu);
  };

  const handleMouseLeave = () => {
    setShowDropdown(null);
  };

  return (
    <>
      <div className='w-full bg-blue-400 h-[80px] sticky top-0 z-50'>
        <div className='container mx-auto px-4 h-full relative'>
          <div className='flex justify-between items-center h-full'>
            <p>logo</p>
            <ul className='hidden md:flex gap-x-6 text-white relative'>
              <li>
                <Link href="/">
                  <p className={`hover:text-black ${isActive('/') ? 'text-black' : ''}`}>Home</p>
                </Link>
              </li>
              <li>
                <Link href="/Contact">
                  <p className={`hover:text-black ${isActive('/Contact') ? 'text-black' : ''}`}>Contact</p>
                </Link>
              </li>
              <li 
              onMouseEnter={()=>handleMouseEnter('service')}
              onMouseLeave={handleMouseLeave}
              >
                <p className={`hover:text-black ${isActive('/Service')? 'text-black' : ''}`}>
                 Our Services
                </p>
                {showDropdown === 'service' && (
                  <div
                    className="absolute top-full mt-0 bg-white text-black rounded-md shadow-lg z-50"
                    onMouseEnter={() => handleMouseEnter('service')}
                    onMouseLeave={handleMouseLeave}
                    >
                      <ul className="p-2">
                        <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Cardiology">Cardiology</Link></li>
                        <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Dermatology">Dermatology</Link></li>
                        <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Gastroenterology">Gastroenterology</Link></li>
                        <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Neurology">Neurology</Link></li>
                        <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Oncology">Oncology</Link></li>
                        </ul>
                    </div>
                )}
              </li>
              <li
                onMouseEnter={()=>handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <p className={`hover:text-black ${isActive('/pages/About') ? 'text-black' : ''}`}>
                  About Us
                </p>
                {showDropdown === 'about' && (
                  <div
                    className="absolute top-full mt-0 bg-white text-black rounded-md shadow-lg z-50"
                    onMouseEnter={()=>handleMouseEnter('about')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="p-2">
                    <li className="p-2 hover:bg-gray-200"><Link href="/pages/About">About Us</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/About/Company">Company</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/About/Team">Team</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/About/Careers">Careers</Link></li>
                    </ul>
                  </div>
                )}
              </li>
              <li>
                <Link href="/pages/Appointment">
                  <p className={`hover:text-black ${isActive('/pages/Appointment') ? 'text-black' : ''}`}>Online Appointment</p>
                </Link>
              </li>
              <li>
                <User className='text-white h-6 w-6 ml-5 cursor-pointer' onClick={() => setUserIconClicked(!userIconClicked)} />
                {userIconClicked && (
                  isloggedIn ? (
                    <button 
                      className="bg-blue-500 text-white rounded-md px-4 py-2 absolute top-12 right-0 z-50"
                      onClick={() => { 
                        setUserIconClicked(!userIconClicked);
                      }}
                    >
                      <Link href='/pages/login'>sign in</Link>
                    </button>
                  ) : (
                    <Link href='/pages/login'>
                      <button 
                        className="bg-blue-500 text-white rounded-md px-4 py-2 absolute top-12 right-0 z-50"
                        onClick={() => setUserIconClicked(false)}
                      >
                        Sign In
                      </button>
                    </Link>
                  )
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
