'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import toast from 'react-hot-toast';

const Details = () => {
    const [image,setImage]=useState(null)



    const registerSchema = Yup.object().shape({
        doctorname: Yup.string().required('Doctor name is required'),
        department: Yup.string().required('Department is required'),
        doctornumber: Yup.string()
            .matches(/^[0-9]+$/, "Doctor number must be numeric")
            .min(10, "Doctor number must be at least 10 digits")
            .required("Required"),
    });

    const formik = useFormik({
        initialValues: {
            doctorname: '',
            department: '',
            doctornumber: '',
        },
        validationSchema: registerSchema,
        onSubmit: values => {
             registerPatient(values);
        },
    });
    const registerPatient = async (values) => {
        let formData = new FormData
        formData.append('doctorname', values.doctorname);
        formData.append('department', values.department);
        formData.append('doctornumber', values.doctornumber);
        formData.append('doctorphoto', image);
        

        const requestOptions = {
            method: "POST",
            body: formData,
        };
    
        try {
            const response = await fetch('http://localhost:8000/doctordetails', requestOptions);
            const data = await response.json();
            if (data.message) {
              toast(data.message)
            }
        } catch (err) {
            alert('An error occurred while submitting the form');
            console.error(err);
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-slate-400 border border-gray-200 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Doctor Details</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="doctorname" className="block text-sm font-medium text-gray-700">
                        Doctor Name
                    </label>
                    <input
                        type="text"
                        id="doctorname"
                        name="doctorname"
                        value={formik.values.doctorname}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {formik.touched.doctorname && formik.errors.doctorname ? (
                        <div className="text-red-600 text-sm">{formik.errors.doctorname}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                        Department
                    </label>
                    <input
                        type="text"
                        id="department"
                        name="department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {formik.touched.department && formik.errors.department ? (
                        <div className="text-red-600 text-sm">{formik.errors.department}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <label htmlFor="doctornumber" className="block text-sm font-medium text-gray-700">
                        Doctor Number
                    </label>
                    <input
                        type="text"
                        id="doctornumber"
                        name="doctornumber"
                        value={formik.values.doctornumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {formik.touched.doctornumber && formik.errors.doctornumber ? (
                        <div className="text-red-600 text-sm">{formik.errors.doctornumber}</div>
                    ) : null}
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])} // Logs the entire event object
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Details;
