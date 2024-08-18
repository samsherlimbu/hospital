import React from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const Content = () => {

  const messageSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
    messageFrom: Yup.string().required("Message From is required"),
    name: Yup.string().required("Name is required"),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
      messageFrom: '',
      name: ''
    },
    validationSchema: messageSchema,
    onSubmit: values => {
      updateMessage(values);
    }
  });

  const updateMessage = async (values) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}message`, requestOptions);
      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.msg);
        // Reset form
        formik.resetForm();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <label className="font-semibold mb-2 block" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="10"
              placeholder="Enter your message here..."
              value={formik.values.message}
              onChange={formik.handleChange}
            ></textarea>
            {formik.touched.message && formik.errors.message ? (
              <div className="text-red-500 text-sm">{formik.errors.message}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="font-semibold mb-2 block" htmlFor="messageFrom">Message From:</label>
            <textarea
              id="messageFrom"
              name="messageFrom"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="1"
              placeholder="Director"
              value={formik.values.messageFrom}
              onChange={formik.handleChange}
            ></textarea>
            {formik.touched.messageFrom && formik.errors.messageFrom ? (
              <div className="text-red-500 text-sm">{formik.errors.messageFrom}</div>
            ) : null}
          </div>
          <div className="mb-6">
            <label className="font-semibold mb-2 block" htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name..."
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Content;
