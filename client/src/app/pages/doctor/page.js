'use client'
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import AddDoctorForm from "../adddoctor/page";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFilterVisibility,
  setPage,
  setFilters,
  setDoctors, // Adjusted import from setPatients to setDoctors
  setAllDoctors, // Adjusted import from setAllPatients to setAllDoctors
  applyFilters,
  toggleAddDoctorForm
} from "@/redux/reducerSlices/doctorSlice";
import axios from "axios";



const Patient = () => {
  const dispatch = useDispatch();
  const {
    filterVisible,
    showAddDoctorForm,
    currentPage,
    filters = { fullName: '', email: '', phoneNumber: '' },
    doctors, // Changed from patients to doctors
    allDoctors // Changed from allPatients to allDoctors
  } = useSelector((state) => state.doctor); // Changed from state.form to state.doctor

  useEffect(() => {
    fetchAllDoctors(); // Changed from fetchAllPatients to fetchAllDoctors
  }, [dispatch]);

  const fetchAllDoctors = async () => { // Removed req, res parameters
    try {
      const { data } = await axios.get('http://localhost:8000/usersdoctor'); // Adjusted endpoint URL
      dispatch(setAllDoctors(data));
      dispatch(setDoctors(data));
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };



  console.log(doctors , "doctors");

  const doctorsPerPage = 5; // Changed from patientsPerPage to doctorsPerPage
  const indexOfLastDoctor = currentPage * doctorsPerPage; // Changed from indexOfLastPatient to indexOfLastDoctor
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage; // Changed from indexOfFirstPatient to indexOfFirstDoctor
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor); // Changed from currentPatients to currentDoctors

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
                <label className="block text-sm font-medium text-gray-700">Name</label> {/* Corrected label */}
                <input
                  type="text"
                  name="fullName"
                  placeholder="Patient name"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.fullName}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label> {/* Corrected label */}
                <input
                  type="text"
                  name="email"
                  placeholder="Patient email"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label> {/* Corrected label */}
                <input
                  type="text"
                  name="phoneNumber" // Changed from phone to phoneNumber
                  placeholder="Patient phone"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.phoneNumber} // Changed from phone to phoneNumber
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
                <th className="py-2 px-4 border-b">Name <span>↑↓</span></th> {/* Adjusted table header */}
                <th className="py-2 px-4 border-b">Email <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Phone Number <span>↑↓</span></th> {/* Adjusted table header */}
                <th className="py-2 px-4 border-b">Department <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Address <span>↑↓</span></th> {/* Adjusted table header */}
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300 gap-2">
              {currentDoctors.map((doctor, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{doctor.fullName}</td>
                  <td className="py-2 px-4">{doctor.email}</td>
                  <td className="py-2 px-4">{doctor.phoneNumber}</td>
                  <td className="py-2 px-4">{doctor.department}</td>
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

export default Patient;
