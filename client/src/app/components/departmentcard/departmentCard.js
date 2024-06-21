'use client';

import Link from 'next/link';
import React from 'react';

const DepartmentCard = ({ item }) => {
  return (
    <div className='bg-slate-300 h-24 w-30 p-4 rounded-full flex justify-center items-center hover:bg-slate-400 border border-solid'>
      <Link href={`/pages/department/${item.department}`}>
        <h1>{item.department}</h1>
      </Link>
    </div>
  );
};

export default DepartmentCard;
