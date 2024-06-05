'use client'
import Link from 'next/link'
import React from 'react'

const services = [
    {
        id: 1,
        name: "Cardiology",
    },
    {
        id: 2,
        name: "Neurology",
    },
    {
        id: 3,
        name: "ENT",
    },
    {
        id: 4,
        name: "Dental",
    },
    {
        id: 5,
        name: "Gynaecology",
    },
    {
        id: 6,
        name: "Orthopedics",
    }, {
        id: 7,
        name: "Urology",
    },
]

const Service = () => {
  return (
    <div className>
      {services.map(service => (
        <Link  key={service.id} href={`/components/service/${service.id}`}>
          <p className='hover:bg-gray-300 p-2'>{service.name}</p>
        </Link>
      ))}
    </div>
  )
}

export default Service
