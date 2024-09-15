"use client";
import React from "react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
const statusOptions = ["Active", "Inactive"];

const AddPatientForm = ({ onCancel }) => {
  const router = useRouter();

  const registerSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "phoneNumber number must be numeric")
      .min(10, "phoneNumber number must be at least 10 digits")
      .required("Required"),
    gender: Yup.string().oneOf(genders).required("Required"),
    address: Yup.string(),
    date: Yup.date().required("Required"),
  
  });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      gender: "",
      address: "",
      date: "",
      
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      registerPatient(values);
    },
  });

  const registerPatient = async (values) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}register`,
      requestOptions
    );
    const data = await response.json();
    if (response.status == "200") {
      toast.success(data.message);
      router.push("/pages/patient");
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className=" flex items-center justify-center bg-gray-100 w-full h-full mt-0">
      <div className="bg-slate-200 p-8 rounded-md shadow-md w-[80%] ">
        <h1 className="mb-6 text-2xl font-bold text-center">Add Patient</h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fullName && formik.errors.fullName ? (
              <div className="text-red-500 text-sm">
                {formik.errors.fullName}
              </div>
            ) : null}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm Password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500 text-sm">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              phoneNumber <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="phoneNumber"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500 text-sm">
                {formik.errors.phoneNumber}
              </div>
            ) : null}
          </div>
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
                <div className="text-red-500 text-sm">
                  {formik.errors.gender}
                </div>
              ) : null}
            </div>

            

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500 text-sm">
                {formik.errors.address}
              </div>
            ) : null}
          </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.date && formik.errors.date ? (
                <div className="text-red-500 text-sm">{formik.errors.date}</div>
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
              Add Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
