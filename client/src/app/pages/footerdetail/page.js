'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Footercase from '../Footercase/page'; // Ensure this component is correctly defined and imported

const FooterForm = () => {
  const [showcase, setShowCase] = useState(false);

  const formSchema = Yup.object().shape({
    address: Yup.string().required('Address is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    emergency: Yup.string()
      .matches(/^[0-9]{10}$/, 'Emergency number must be exactly 10 digits')
      .required('Emergency number is required'),
    bloodBank: Yup.string()
      .matches(/^[0-9]{10}$/, 'Blood bank number must be exactly 10 digits')
      .required('Blood bank number is required'),
    ambulance: Yup.string()
      .matches(/^[0-9]{10}$/, 'Ambulance number must be exactly 10 digits')
      .required('Ambulance number is required'),
    appointment: Yup.string()
      .matches(/^[0-9]{10}$/, 'Appointment number must be exactly 10 digits')
      .required('Appointment number is required'),
  });

  const updateFooterInfo = async (values) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}footer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error('Error submitting form');
    }
  };

  const formik = useFormik({
    initialValues: {
      address: '',
      email: '',
      emergency: '',
      bloodBank: '',
      ambulance: '',
      appointment: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      updateFooterInfo(values);
    },
  });

  const handleNavigateToForm = () => {
    setShowCase(true);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gray-100 rounded-lg shadow-md">
      {showcase ? (
        <Footercase onCancel={() => setShowCase(false)} />
      ) : (
        <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200 mb-3"
            onClick={handleNavigateToForm}
          >
            Previous Messages
          </button>
          <div className="mb-6 w-full">
            <label className="font-bold block mb-2" htmlFor="address">📍 Address</label>
            <input
              id="address"
              name="address"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter address"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.touched.address && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.address}</p>
            )}
          </div>

          <div className="mb-6 w-full">
            <label className="font-bold block mb-2" htmlFor="email">📧 Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
            )}
          </div>

          <div className="mb-6 w-full">
            <label className="font-bold block mb-2" htmlFor="emergency">📞 Emergency</label>
            <input
              id="emergency"
              name="emergency"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter emergency number"
              value={formik.values.emergency}
              onChange={formik.handleChange}
            />
            {formik.errors.emergency && formik.touched.emergency && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.emergency}</p>
            )}
          </div>

          <div className="mb-6 w-full">
            <label className="font-bold block mb-2" htmlFor="bloodBank">Blood bank</label>
            <input
              id="bloodBank"
              name="bloodBank"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter blood bank number"
              value={formik.values.bloodBank}
              onChange={formik.handleChange}
            />
            {formik.errors.bloodBank && formik.touched.bloodBank && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.bloodBank}</p>
            )}
          </div>

          <div className="mb-6 w-full">
            <label className="font-bold block mb-2" htmlFor="ambulance">🚑 Ambulance</label>
            <input
              id="ambulance"
              name="ambulance"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter ambulance number"
              value={formik.values.ambulance}
              onChange={formik.handleChange}
            />
            {formik.errors.ambulance && formik.touched.ambulance && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.ambulance}</p>
            )}
          </div>

          <div className="mb-6 w-full">
            <label className="font-bold block mb-2" htmlFor="appointment">📅 Appointment</label>
            <input
              id="appointment"
              name="appointment"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter appointment number"
              value={formik.values.appointment}
              onChange={formik.handleChange}
            />
            {formik.errors.appointment && formik.touched.appointment && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.appointment}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default FooterForm;
