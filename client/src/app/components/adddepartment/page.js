'use client';
import { Button } from '@nextui-org/react';
import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from 'react-hot-toast';

const Component = [
  {
    name: "department",
    label: "Department",
  },
];

const departmentSchema = Yup.object().shape({
  department: Yup.string().required('Department is required'),
});

const AddDepartment = () => {
  const formik = useFormik({
    initialValues: {
      department: '',
    },
    validationSchema: departmentSchema,
    onSubmit: (values) => {
      AddDepartment(values)
    },
  });
  const AddDepartment = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}department`, requestOptions);
    const data = await response.json();
    if(response.status == '200'){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
  }

  return (
    <div className='flex items-center justify-center bg-slate-300 p-4'>
      <div className='p-4 flex'>
        <form className='flex items-center space-x-4' onSubmit={formik.handleSubmit}>
          {Component.map((item, index) => (
            <div key={index} className='flex items-center space-x-2'>
              <label className="block text-gray-700 font-bold text-1xl" htmlFor={item.name}>
                {item.label}:
              </label>
              <input
                type="text"
                id={item.name}
                name={item.name}
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 block w-full sm:text-sm border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.errors.department && formik.touched.department && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.department}</div>
              )}
            </div>
          ))}
          <div className='ml-8'> {/* Add a margin-left to separate the button */}
            <Button type='submit' className='bg-slate-400 hover:bg-slate-300'>Add department</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDepartment;
