'use client';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Book = () => {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  return (
    <div className="bg-gray-400 hover:bg-slate-300 h-[90px] flex justify-center items-center mt-2 rounded-lg shadow-lg">
      <Link href="/pages/Appointment">
        <p
          className={`text-black hover:text-black ${
            isActive('/pages/Appointment') ? 'text-black' : ''
          }`}
        >
          BOOK APPOINTMENT
        </p>
      </Link>
    </div>
  );
};

export default Book;
