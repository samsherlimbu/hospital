import DepartmentCard from '@/app/components/departmentcard/departmentCard';
import React, { useEffect, useState } from 'react';

const Department = () => {
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
    <div className='mx-auto p-10 bg-gray-200 w-full rounded-sm '>
      <div className='text-3xl font-bold text-center mb-11 mt-3'>
        <h1> Departments of Kantipur Hospital</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 '>
        {departments.map((item) => (
          <DepartmentCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Department;
