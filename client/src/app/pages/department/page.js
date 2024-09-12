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

  const departmentsToShow = showAll ? departments : departments.slice(0, 6);

  return (
    <>
      <div className=" text-center mb-12  text-gray-900 p-6 bg-slate-100 rounded-sm">
        <h1 className='text-4xl font-extrabold mb-8'>Departments of Kantipur Hospital</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {departmentsToShow.map((item) => (
          <DepartmentCard key={item._id} item={item} />
        ))}
      </div>
      {departments.length > 6 && (
        <div className="flex justify-center mt-10">
          <button
            onClick={toggleShowAll}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg py-3 px-6 transition-transform transform hover:scale-105 shadow-lg"
          >
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
      </div>
    </>
  );
};

export default Department;
