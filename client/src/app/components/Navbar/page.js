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
      <div className='w-full bg-blue-400 h-[80px] sticky top-0'>
        <div className='container mx-auto px-4 h-full'>
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
                  <div className="bg-zinc-50 rounded-md shadow-md absolute top-10 right-0 h-[200px] w-[200px] transition-all duration-150 ease-in z-50"></div>
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
