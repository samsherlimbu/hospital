'use client'

import Link from 'next/link'
import React from 'react'

const DepartmentCard = ({ item }) => {
  return (
    <div className='bg-slate-400 h-24 w-30 p-4 rounded-full flex justify-center items-center hover:bg-slate-300 border border-solid'>
      <Link href={`/pages/department/${item.id}`}>
          <h1>{item.name}</h1>
      </Link>
    </div>
  )
}

export default DepartmentCard;
