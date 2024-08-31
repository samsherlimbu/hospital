'use client';
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useRouter } from 'next/navigation';

const Appointment = () => {
  const doctors = useSelector((state) => state.doctor.doctors);
  const router = useRouter();

  // Extract unique department names from doctors
  const departments = [...new Set(doctors.map((doctor) => doctor.department))];

  // State for selected department and filtered doctors
  const [selectedDepartment, setSelectedDepartment] = useState('None');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Update filtered doctors when department changes
  useEffect(() => {
    if (selectedDepartment === 'None') {
      setFilteredDoctors([]);
    } else {
      setFilteredDoctors(doctors.filter((doctor) => doctor.department === selectedDepartment));
    }
  }, [selectedDepartment, doctors]);

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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-gray-300 rounded-lg shadow-lg p-8">
        <div className="border-t border-b border-black py-4 mb-8">
          <h1 className="text-center font-bold text-3xl mb-6 text-black">
            Book an Appointment
          </h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-8">
            <h2 className="font-bold text-2xl mb-5 text-gray-800 text-center">
              Doctors Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department*
                </label>
                <select
                  name="department"
                  value={formik.values.department}
                  onChange={(e) => {
                    formik.handleChange(e);
                    setSelectedDepartment(e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.department && formik.errors.department ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                >
                  <option value="None">None</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                {formik.touched.department && formik.errors.department && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.department}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Doctors*
                </label>
                <select
                  name="doctor"
                  value={formik.values.doctor}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.doctor && formik.errors.doctor ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                >
                  <option value="None">None</option>
                  {filteredDoctors.map((doctor, index) => (
                    <option key={index} value={doctor.fullName}>
                      {doctor.fullName}
                    </option>
                  ))}
                </select>
                {formik.touched.doctor && formik.errors.doctor && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.doctor}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Appointment Date*
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formik.values.appointmentDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.appointmentDate && formik.errors.appointmentDate ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                />
                {formik.touched.appointmentDate && formik.errors.appointmentDate && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.appointmentDate}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Appointment Time*
                </label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formik.values.appointmentTime}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.appointmentTime && formik.errors.appointmentTime ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                />
                {formik.touched.appointmentTime && formik.errors.appointmentTime && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.appointmentTime}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="font-bold text-2xl mb-5 text-gray-800 text-center">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name*
                </label>
                <input
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.name}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email*
                </label>
                <input
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.email}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number*
                </label>
                <input
                  type="text"
                  name="number"
                  value={formik.values.number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.number && formik.errors.number ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                />
                {formik.touched.number && formik.errors.number && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.number}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Age*
                </label>
                <input
                  type="number"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.age && formik.errors.age ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                />
                {formik.touched.age && formik.errors.age && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.age}</div>
                )}
              </div>
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender*
                </label>
                <select
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`block w-full rounded-lg shadow-sm border ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring focus:ring-teal-200`}
                >
                  {genderOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <div className="absolute right-0 top-full text-red-500 text-sm mt-1">{formik.errors.gender}</div>
                )}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-200 mr-4"
            >
              Book Appointment
            </button>
            <button
              onClick={() => router.push('/')}
              className="bg-teal-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-600 transition duration-200"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
