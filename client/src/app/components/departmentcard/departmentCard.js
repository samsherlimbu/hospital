'use client';

import Link from 'next/link';
import React from 'react';

const DepartmentCard = ({ item }) => {
  return (
    <Link href={`/pages/department/${item.department}`}>
      <div className='bg-slate-300 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105 hover:bg-slate-400 border border-gray-200'>
        <div className='bg-blue-500 text-white rounded-full h-16 w-16 flex items-center justify-center mb-4'>
          <span className='text-xl font-bold'>{item.department.charAt(0).toUpperCase()}</span>
        </div>
        <h2 className='text-lg font-semibold text-gray-800'>{item.department}</h2>
      </div>
    </Link>
  );
};

export default DepartmentCard;
