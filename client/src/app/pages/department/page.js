'use client';
import React, { useEffect, useState } from 'react';
import DepartmentCard from '@/app/components/departmentcard/departmentCard';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchDepartment();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}usersdoctor`);
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

  const toggleShowAll = () => {
    setShowAll(prevShowAll => !prevShowAll);
  };

  const departmentsToShow = showAll ? departments : departments.slice(0, 8);

  return (
    <div className='mx-auto p-10 bg-gray-200 w-full rounded-sm'>
      <div className='text-3xl font-bold text-center mb-11 mt-3'>
        <h1>Departments of Kantipur Hospital</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
        {departmentsToShow.map((item) => (
          <DepartmentCard key={item._id} item={item} />
        ))}
      </div>
      {departments.length > 8 && (
        <div className='flex justify-center mt-6'>
          <button onClick={toggleShowAll} className='bg-gray-800 hover:bg-gray-600 text-white rounded-lg py-2 px-4'>
            {showAll ? 'Show Less' : 'Show All'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Department;
