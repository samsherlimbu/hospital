'use client'
import { User } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUserIcon,setShowDropdown, hideDropdown } from '@/redux/reducerSlices/navbarSlice';
import Service from '../service/page';
 

const Navbar = () => {
  const dispatch = useDispatch();
  const { userIconClicked, isLoggedIn, showDropdown } = useSelector(state => state.navbar);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const handleMouseEnter = (menu) => {
    dispatch(setShowDropdown(menu));
  };

  const handleMouseLeave = () => {
    dispatch(hideDropdown());
  };

  return (
    <>
      <div className='w-full bg-gray-400 h-[80px] z-50'>
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
                onMouseEnter={() => handleMouseEnter('service')}
                onMouseLeave={handleMouseLeave}
              >
                <p className={`cursor-pointer hover:text-black ${isActive('/Service') ? 'text-black' : ''}`}>
                 Our Services
                </p>
                {showDropdown === 'service' && (
                  <div
                    className="absolute top-full w-40 text-center mt-0 bg-white text-black rounded-md shadow-lg z-50"
                    onMouseEnter={() => handleMouseEnter('service')}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* <ul className="p-2">
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Cardiology">Cardiology</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Dermatology">Dermatology</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Gastroenterology">Gastroenterology</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Neurology">Neurology</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/pages/Service/Oncology">Oncology</Link></li>
                    </ul> */}
                    <Service/>
                  </div>
                )}
              </li>
              <li
                onMouseEnter={() => handleMouseEnter('about')}
                onMouseLeave={handleMouseLeave}
                className="relative"
              >
                <p className={`cursor-pointer hover:text-black ${isActive('/pages/About') ? 'text-black' : ''}`}>
                  About Us
                </p>
                {showDropdown === 'about' && (
                  <div
                    className="absolute top-full w-24 mt-0 bg-white text-black rounded-md shadow-lg z-50"
                    onMouseEnter={() => handleMouseEnter('about')}
                    onMouseLeave={handleMouseLeave}
                  >
                    <ul className="p-2">
                      <li className="p-2 hover:bg-gray-200"><Link href="/components/About">AboutUs</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/components/Team">Doctors</Link></li>
                      <li className="p-2 hover:bg-gray-200"><Link href="/components/Careers">Careers</Link></li>
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
                <User className='text-white h-6 w-6 ml-5 cursor-pointer' onClick={() => dispatch(toggleUserIcon())} />
                {userIconClicked && (
                  isLoggedIn ? (
                    <button 
                      className="bg-blue-500 text-white rounded-md px-4 py-2 absolute top-12 right-0 z-50"
                      onClick={() => { 
                        dispatch(toggleUserIcon());
                      }}
                    >
                      <Link href='/pages/login'>Sign In</Link>
                    </button>
                  ) : (
                    <Link href='/pages/login'>
                      <button 
                        className="bg-blue-500 text-white rounded-md px-4 py-2 absolute top-12 right-0 z-50"
                        onClick={() => dispatch(toggleUserIcon())}
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
};

export default Navbar;
