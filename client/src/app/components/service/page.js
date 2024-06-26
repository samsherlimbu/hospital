'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

// const services = [
//     {
//         id: 1,
//         name: "Cardiology",
//     },
//     {
//         id: 2,
//         name: "Neurology",
//     },
//     {
//         id: 3,
//         name: "ENT",
//     },
//     {
//         id: 4,
//         name: "Dental",
//     },
//     {
//         id: 5,
//         name: "Gynaecology",
//     },
//     {
//         id: 6,
//         name: "Orthopedics",
//     }, {
//         id: 7,
//         name: "Urology",
//     },
// ]

const Service = () => {


  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await fetch('http://localhost:8000/usersdoctor');
      const data = await response.json();

      // Create a Set to store unique department names
      const uniqueDepartments = Array.from(new Set(data.map(item => item.department)));

      // Map back to original data structure with just department names and IDs
      const uniqueDepartmentData = uniqueDepartments.map(dept => {
        const deptInfo = data.find(item => item.department === dept);
        return { _id: deptInfo._id, department: deptInfo.department };
      });

      setDepartments(uniqueDepartmentData);
      console.log(uniqueDepartmentData);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <div className>
      {departments.map(item => (
        <Link  key={item._id} href={`/components/service/${item.department}`}>
          <p className='hover:bg-gray-300 p-2 text-black'>{item.department}</p>
        </Link>
      ))}
    </div>
  )
}

export default Service
