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

const Doctor = () => {
  const dispatch = useDispatch();
  const {
    filterVisible,
    showAddDoctorForm,
    currentPage,
    filters = { fullName: '', email: '', phoneNumber: '' },
    doctors = [],  // Initialize as an empty array if undefined
  } = useSelector((state) => state.doctor);

  useEffect(() => {
    fetchAlldoctors();
  }, [dispatch]);

  const fetchAlldoctors = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/usersdoctor');
      dispatch(setDoctors(data));
    } catch (error) {
      console.error("Error fetching doctors:", error);
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
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => dispatch(toggleAddDoctorForm())}
              >
                Add Doctor
              </button>
            </div>
            <div>
              <button
                onClick={() => dispatch(toggleFilterVisibility())}
                className="btn-filter bg-blue-500 text-white px-4 py-2 rounded"
              >
                Filter
              </button>
            </div>
          </div>
          {filterVisible && (
            <div className="flex justify-between mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your name"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.fullName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Your email"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your number"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.phone}
                />
              </div>
              <div className="flex items-end">
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                  onClick={handleApplyFilters}
                >
                  Submit
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
                <th className="py-2 px-4 border-b">Gender <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Address <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300 gap-2">
              {currentDoctors.map((doctor, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{doctor.fullName}</td>
                  <td className="py-2 px-4">{doctor.email}</td>
                  <td className="py-2 px-4">{doctor.phoneNumber}</td>
                  <td className="py-2 px-4">{doctor.gender}</td>
                  <td className="py-2 px-4">{doctor.address}</td>
                  <td className="flex p-4">
                    <span className="cursor-pointer space-y-2">
                      <Button className="bg-slate-400">Delete</Button>
                      <Button className="bg-slate-400">Details</Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePaginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <div>
              {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handlePaginate(i + 1)}
                  className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePaginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(doctors.length / doctorsPerPage)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
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
