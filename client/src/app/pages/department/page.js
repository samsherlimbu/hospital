import DepartmentCard from '@/app/components/departmentcard/departmentCard';
import React from 'react';


const departments = [
  { id: 321, name: 'Orthopedic Surgery', path: 'orthopedic-surgery' },
  { id: 111, name: 'General Surgery', path: 'general-surgery' },
  { id: 222, name: 'Urology', path: 'urology' },
  { id: 333, name: 'General Medicine', path: 'general-medicine' },
  { id: 444, name: 'Neuroscience', path: 'neuroscience' },
  { id: 555, name: 'Gynaecology/Obstetrics', path: 'gynaecology-obstetrics' },
  { id: 999, name: 'Paediatrics', path: 'paediatrics' },
  { id: 777, name: 'Plastic Surgery', path: 'plastic-surgery' }
];

const Department = () => {
  return (
    <div className='mx-auto p-10 bg-gray-200 w-full rounded-sm '>
      <div className='text-3xl font-bold text-center mb-11 mt-3'>
        <h1> Departments of Kantipur Hospital</h1>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 '>
        {departments.map((item) => (
          <DepartmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Department;
