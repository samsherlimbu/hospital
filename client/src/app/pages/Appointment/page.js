'use client';
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const Appointment = () => {
  const options = ["None", "gastrology", "pathology", "gyanology"];
  const options1 = ["None", "samsher", "kaylin", "aashish"];
  const genderOptions = ["None", "male", "female", "other"];

  const AppointSchema = Yup.object().shape({
    department: Yup.string().required("Department is required"),
    doctor: Yup.string().required("Doctor is required"),
    appointmentDate: Yup.date().required("Appointment Date is required"),
    appointmentTime: Yup.string().required("Appointment Time is required"),
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    number: Yup.string().required("Number is required"),
    age: Yup.number().min(0, "Age must be at least 0").max(120, "Age must be at most 120").required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const formik = useFormik({
    initialValues: {
      department: 'None',
      doctor: 'None',
      appointmentDate: '',
      appointmentTime: '',
      name: '',
      email: '',
      number: '',
      age: '',
      gender: 'None',
    },
    validationSchema: AppointSchema,
    onSubmit: values => {
      console.log(values);
    }
  });

  return (
    <div className="container bg-slate-300 mx-auto px-4 py-8 mt-6 rounded-lg shadow-lg mb-10">
      <div className="border-t border-b border-blue-300 py-3">
        <h1 className="text-center font-extrabold text-4xl mb-7 text-blue-700">
          Book an Appointment
        </h1>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl mb-7 text-gray-600">
            Doctors Information
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Department*
              </label>
              <select
                name="department"
                value={formik.values.department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.department && formik.errors.department ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              >
                {options.map((items, index) => (
                  <option key={index} value={items}>
                    {items}
                  </option>
                ))}
              </select>
              {formik.touched.department && formik.errors.department && (
                <div className="text-red-500 text-sm">{formik.errors.department}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Doctors*
              </label>
              <select
                name="doctor"
                value={formik.values.doctor}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.doctor && formik.errors.doctor ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              >
                {options1.map((items, index) => (
                  <option key={index} value={items}>
                    {items}
                  </option>
                ))}
              </select>
              {formik.touched.doctor && formik.errors.doctor && (
                <div className="text-red-500 text-sm">{formik.errors.doctor}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-7">
                Appointment Date*
              </label>
              <input
                type="date"
                name="appointmentDate"
                value={formik.values.appointmentDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.appointmentDate && formik.errors.appointmentDate ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              />
              {formik.touched.appointmentDate && formik.errors.appointmentDate && (
                <div className="text-red-500 text-sm">{formik.errors.appointmentDate}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-7">
                Appointment Time*
              </label>
              <input
                type="time"
                name="appointmentTime"
                value={formik.values.appointmentTime}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.appointmentTime && formik.errors.appointmentTime ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              />
              {formik.touched.appointmentTime && formik.errors.appointmentTime && (
                <div className="text-red-500 text-sm">{formik.errors.appointmentTime}</div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl mb-7 text-gray-600">
            Personal Information
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Name*
              </label>
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Email*
              </label>
              <input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Number*
              </label>
              <input
                type="text"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.number && formik.errors.number ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              />
              {formik.touched.number && formik.errors.number && (
                <div className="text-red-500 text-sm">{formik.errors.number}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Age*
              </label>
              <input
                type="number"
                name="age"
                value={formik.values.age}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.age && formik.errors.age ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
                min="0"
                max="120"
              />
              {formik.touched.age && formik.errors.age && (
                <div className="text-red-500 text-sm">{formik.errors.age}</div>
              )}
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Gender*
              </label>
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`block w-full rounded-md shadow-sm border ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-gray-400'} hover:border-black`}
              >
                {genderOptions.map((items, index) => (
                  <option key={index} value={items}>
                    {items}
                  </option>
                ))}
              </select>
              {formik.touched.gender && formik.errors.gender && (
                <div className="text-red-500 text-sm">{formik.errors.gender}</div>
              )}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Request for Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
