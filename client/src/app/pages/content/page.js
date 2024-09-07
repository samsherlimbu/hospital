'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import MessageDetails from '../messageDetails/page'; // Corrected component name

const Content = () => {
  const [showAddCase, setShowAddCase] = useState(false);
  const [image, setImage] = useState(null);

  const messageSchema = Yup.object().shape({
    message: Yup.string().required('Message is required'),
    messageFrom: Yup.string().required('Message From is required'),
    name: Yup.string().required('Name is required'),
  });

  const formik = useFormik({
    initialValues: {
      message: '',
      messageFrom: '',
      name: '',
    },
    validationSchema: messageSchema,
    onSubmit: (values) => {
      updateMessage(values);
    },
  });

  const updateMessage = async (values) => {
    let formData = new FormData();
    for (let item in values) {
      formData.append(item, values[item]);
    }
    if (image) {
      formData.append('messageImage', image); // Ensure the file is appended
    }

    const requestOptions = {
      method: 'POST',
      body: formData,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}message`, requestOptions);
      const data = await response.json();

      if (response.status === 201) {
        toast.success(data.msg);
        formik.resetForm();
        setImage(null); // Reset image after success
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error('Error submitting form');
    }
  };

  // Define the navigation logic to show messages
  const handleNavigateToMessages = () => {
    setShowAddCase(true);
  };

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen flex justify-center items-center">
      {showAddCase ? (
        <MessageDetails onCancel={() => setShowAddCase(false)} />
      ) : (
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <button
            className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition duration-200 mb-3"
            onClick={handleNavigateToMessages}
          >
            Previous Messages
          </button>
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
              />
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
              />
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
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-3"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Content;
