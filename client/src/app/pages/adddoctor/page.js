"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const genders = ["Male", "Female", "Other"];
const statusOptions = ["Active", "Inactive"];
const doctors = [
  { name: "fullName", label: "Full Name" },
  { name: "email", label: "Email" },
  { name: "phoneNumber", label: "Phone Number" },
  { name: "address", label: "Address" },
  { name: "department", label: "Department" },
];

const AddDoctorForm = ({ onCancel }) => {
  const router = useRouter();

  const registerSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .required("Required"),
    gender: Yup.string().oneOf(genders).required("Required"),
    status: Yup.string().oneOf(statusOptions).required("Required"),
    address: Yup.string(),
    department: Yup.string().required("Required"),
  });

  const registerDoctor = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const response = await fetch(
      "http://localhost:8000/registerdoctor",
      requestOptions
    );
    const data = await response.json();
    if (response.ok) {
      toast.success(data.message);
      router.push("/dashboard");
    } else {
      toast.error(data.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      gender: "",
      status: "",
      address: "",
      department: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerDoctor(values);
    },
  });

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full h-full mt-0">
      <div className="bg-slate-200 p-8 rounded-md shadow-md w-[80%]">
        <h1 className="mb-6 text-2xl font-bold text-center">Add Doctor</h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={formik.handleSubmit}>
          {doctors.map((item, index) => (
            <div key={index}>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor={item.name}
              >
                {item.label}

                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={item.name}
                name={item.name}
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[item.name]}
              />
              <p className="text-red-500">
                {formik.touched[item.name] && formik.errors[item.name]}
              </p>
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              id="gender"
              name="gender"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select gender" />
              {genders.map((item, id) => (
                <option value={item} key={id}>
                  {item}
                </option>
              ))}
            </select>
            {formik.touched.gender && formik.errors.gender ? (
              <div className="text-red-500 text-sm">{formik.errors.gender}</div>
            ) : null}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" label="Select status" />
              {statusOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            {formik.touched.status && formik.errors.status ? (
              <div className="text-red-500 text-sm">{formik.errors.status}</div>
            ) : null}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorForm;
