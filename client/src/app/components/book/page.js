'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Book = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <>
    <Link href="/pages/Appointment">
    <div className="bg-gray-200 hover:bg-gray-400 h-[90px] flex justify-center items-center mt-2 rounded-lg shadow-lg">
      
        <p
          className={`text-black hover:text-black ${
            isActive('/pages/Appointment') ? 'text-black' : ''
          }`}
        >
          BOOK APPOINTMENT
        </p>
      
    </div>
    </Link>
    </>
  );
};

export default Book;
