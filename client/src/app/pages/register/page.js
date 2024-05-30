import React from "react";
import { Input } from "@nextui-org/react";
import Link from "next/link";

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
const status = ["Active", "Inactive"];

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-8 w-screen bg-gray-100">
      <div className="w-[45%] bg-gray-300 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Create your account
          </h1>
          <form className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Name"
              />
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
                  required
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
                <span className="text-red-300">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Phone Number"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                  <span className="text-red-300">*</span>
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {genders.map((item, id) => (
                    <option value={item} key={id}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Blood Group
                  <span className="text-red-300">*</span>
                </label>
                <select
                  id="blood-group"
                  name="blood-group"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {bloodGroups.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <div className="mt-1 flex justify-center border-2 border-dashed border-white rounded-md py-6 px-6">
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path d="M24 0v48M0 24h48" />
                  </svg>
                  <div className="flex text-sm text-gray-600 mt-2">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Address"
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="dob">
                  Date of Birth <span className="text-red-300">*</span>
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  required
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700" htmlFor="status">
                  Status <span className="text-red-300">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {status.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-light text-black dark:text-gray-300">
                I accept the{" "}
                <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an account
            </button>
            <p className="text-sm font-light text-black dark:text-gray-400">
              Already have an account yet?{" "}
              <Link href="/pages/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
