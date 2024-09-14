'use client';
import React, { useEffect } from "react";
import { Button } from "@nextui-org/react";
import AddPatientForm from "../addpatient/page";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddPatientForm,
  toggleFilterVisibility,
  setPage,
  setFilters,
  setPatients,
  setAllPatients,
  applyFilters
} from "@/redux/reducerSlices/formSlice";
import axios from "axios";
import Link from "next/link";

const Patient = () => {
  const dispatch = useDispatch();
  const {
    filterVisible,
    showAddPatientForm,
    currentPage,
    filters = { fullName: '', email: '', phoneNumber: '' },
    patients = [],
    allPatients = []
  } = useSelector((state) => state.form);

  useEffect(() => {
    const fetchAllPatients = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}users`);
        console.log('Fetched patients data:', data); // Debugging log
        dispatch(setAllPatients(data));
        dispatch(setPatients(data));
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchAllPatients();
  }, [dispatch]);

  const handleDeletePatient = async (id) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}deleteuser/${id}`);
        // Remove the patient from local state
        dispatch(setPatients(patients.filter(patient => patient._id !== id)));
    } catch (error) {
        console.error('Error deleting patient:', error);
    }
};

  const patientsPerPage = 5;
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  console.log('Current Patients:', currentPatients); // Debugging log

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

  if (!patients.length) {
    return <div className="flex items-center justify-center h-screen text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {showAddPatientForm ? (
        <AddPatientForm onCancel={() => dispatch(toggleAddPatientForm())} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <Button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              onClick={() => dispatch(toggleAddPatientForm())}
            >
              Add Patient
            </Button>
            <Button
              onClick={() => dispatch(toggleFilterVisibility())}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
            >
              Filter
            </Button>
          </div>
          {filterVisible && (
            <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your name"
                  className="px-4 py-2 border rounded-lg w-full"
                  onChange={handleInputChange}
                  value={filters.fullName}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Your email"
                  className="px-4 py-2 border rounded-lg w-full"
                  onChange={handleInputChange}
                  value={filters.email}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Your number"
                  className="px-4 py-2 border rounded-lg w-full"
                  onChange={handleInputChange}
                  value={filters.phoneNumber}
                />
              </div>
              <div className="flex items-end md:items-center mt-4 md:mt-0">
                <Button
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
                  onClick={handleApplyFilters}
                >
                  Submit
                </Button>
              </div>
            </div>
          )}
          <table className="min-w-full bg-white border rounded-lg shadow-md overflow-hidden">
            <thead className="bg-slate-400 text-white">
              <tr>
                <th className="py-3 px-4 border-b">Full Name</th>
                <th className="py-3 px-4 border-b">Email</th>
                <th className="py-3 px-4 border-b">Phone Number</th>
                <th className="py-3 px-4 border-b">Gender</th>
                <th className="py-3 px-4 border-b">Address</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-slate-300">
              {currentPatients.map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{patient.fullName}</td>
                  <td className="py-2 px-4">{patient.email}</td>
                  <td className="py-2 px-4">{patient.phoneNumber}</td>
                  <td className="py-2 px-4">{patient.gender}</td>
                  <td className="py-2 px-4">{patient.address}</td>
                  <td className="flex p-4 space-x-2">
                    <Button 
                      className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                      onClick={() => handleDeletePatient(patient._id)}
                    >
                      Delete
                    </Button>
                    <Link href={`/pages/patient/${patient._id}`} passHref>
                      <Button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                      >
                        Details
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => handlePaginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Previous
            </Button>
            <div>
              {Array.from({ length: Math.ceil(patients.length / patientsPerPage) }, (_, i) => (
                <Button
                  key={i + 1}
                  onClick={() => handlePaginate(i + 1)}
                  className={`px-4 py-2 mx-1 rounded-lg shadow-md transition duration-300 ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <Button
              onClick={() => handlePaginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(patients.length / patientsPerPage)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Patient;
