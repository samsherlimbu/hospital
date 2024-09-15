'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/page';
import Footer from '../footer/page';

const Service = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}departments`);
      const data = await response.json();

      const uniqueDepartments = Array.from(new Set(data.map(item => item.department)));

      const uniqueDepartmentData = uniqueDepartments.map(dept => {
        const deptInfo = data.find(item => item.department === dept);
        return { _id: deptInfo._id, department: deptInfo.department };
      });

      setDepartments(uniqueDepartmentData);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-10 bg-slate-200 mt-4 mb-4 shadow-lg rounded-sm">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
            Our Departments
          </h1>
          <p className="text-gray-500 mt-4">Explore our diverse medical services</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {departments.map(item => (
            <Link key={item._id} href={`/components/service/${item.department}`}>
              <div className="group relative flex items-center justify-center h-48 bg-white rounded-lg shadow-md border border-gray-200 hover:border-transparent hover:shadow-lg hover:bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                <h2 className="text-xl font-semibold text-gray-800 group-hover:text-white transition-all duration-300 text-center">
                  {item.department.toUpperCase()}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Service;
