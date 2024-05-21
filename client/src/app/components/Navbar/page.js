'use client'
import { User } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';



const Navbar = () => {
  const [userIconClicked, setUserIconClicked] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

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
              <li>
                <Link href="/pages/About">
                  <p className={`hover:text-black ${isActive('/pages/About') ? 'text-black' : ''}`}>About Us</p>
                </Link>
              </li>
              <li>
                <User className='text-white h-6 w-6 ml-5 cursor-pointer' onClick={() => setUserIconClicked(!userIconClicked)} />
                {userIconClicked && (
                  <button 
                  className="bg-blue-500 text-white rounded-md px-4 py-2 absolute top-12 right-0 z-50"
                  onClick={() => { 
                    setUserIconClicked(!userIconClicked)
                   }}
                >
                  <Link href='/pages/login'>sign in</Link>
                </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar;
