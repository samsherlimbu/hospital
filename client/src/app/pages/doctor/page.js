'use client';
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import AddDoctorForm from "../adddoctor/page";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddDoctorForm,
  toggleFilterVisibility,
  setPage,
  setFilters,
  setDoctors,
  applyFilters
} from "@/redux/reducerSlices/doctorSlice";
import axios from "axios";
import Link from "next/link";

const Doctor = () => {
  const dispatch = useDispatch();
  const {
    filterVisible,
    showAddDoctorForm,
    currentPage,
    filters = { fullName: '', email: '', phoneNumber: ''},
    doctors = [],
  } = useSelector((state) => state.doctor);

  useEffect(() => {
    fetchAllDoctors();
  }, [dispatch]);

  const fetchAllDoctors = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}usersdoctor`);
      dispatch(setDoctors(data));
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}usersdoctor/${doctorId}`);
      fetchAllDoctors(); // Re-fetch doctors after deletion
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const doctorsPerPage = 5;
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  const handlePaginate = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="container mx-auto p-4">
      {showAddDoctorForm ? (
        <AddDoctorForm onCancel={() => dispatch(toggleAddDoctorForm())} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                onClick={() => dispatch(toggleAddDoctorForm())}
              >
                Add Doctor
              </button>
            </div>
            <div>
              <button
                onClick={() => dispatch(toggleFilterVisibility())}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                Filter
              </button>
            </div>
          </div>
          {filterVisible && (
            <div className="flex flex-wrap gap-4 mb-4">
              {/* Filter Form */}
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter name"
                  className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={handleInputChange}
                  value={filters.fullName}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={handleInputChange}
                  value={filters.email}
                />
              </div>
              <div className="w-full sm:w-1/3">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={handleInputChange}
                  value={filters.phone}
                />
              </div>
              <div className="w-full flex items-end">
                <button
                  className="bg-teal-600 text-white px-5 py-2 rounded-lg shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
                  onClick={handleApplyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          <table className="min-w-full bg-white border">
            <thead className="bg-slate-400">
              <tr>
                <th className="py-2 px-4 border-b">Full Name <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Email <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Phone Number <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Department <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Address <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300">
              {currentDoctors.map((doctor, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{doctor.fullName}</td>
                  <td className="py-2 px-4">{doctor.email}</td>
                  <td className="py-2 px-4">{doctor.phoneNumber}</td>
                  <td className="py-2 px-4">{doctor.department}</td>
                  <td className="py-2 px-4">{doctor.address}</td>
                  <td className="flex space-x-2 mt-2">
                    <Button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                      onClick={() => deleteDoctor(doctor._id)}
                    >
                      Delete
                    </Button>
                    <Link
                      href={`/pages/doctor/${doctor._id}`}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePaginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              Previous
            </button>
            <div>
              {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePaginate(i + 1)}
                  className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'} rounded-lg shadow hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePaginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(doctors.length / doctorsPerPage)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Doctor;
