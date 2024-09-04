'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddCase from '../addcase/page';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const PatientCaseStudies = () => {
  const [patients, setPatients] = useState([]);
  const [patientsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', email: '', phone: '' });
  const [filterVisible, setFilterVisible] = useState(false);
  const [showAddCase, setShowAddCase] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCase();
  }, []);

  const fetchCase = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}patient-cases`);
      setPatients(data.data);
    } catch (error) {
      console.error("Error fetching patient case studies:", error);
    }
  };

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    const filteredPatients = patients.filter(patient =>
      patient.patient.toLowerCase().includes(filters.name.toLowerCase()) &&
      patient.email.toLowerCase().includes(filters.email.toLowerCase()) &&
      (patient.phone ? patient.phone.includes(filters.phone) : true)
    );
    setPatients(filteredPatients);
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible); // Toggle visibility
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      {showAddCase ? (
        <AddCase onCancel={() => setShowAddCase(false)} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={() => setShowAddCase(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Patient Case Studies
              </button>
            </div>
            <div>
              <button
                onClick={toggleFilter}
                className="btn-filter bg-blue-500 text-white px-4 py-2 rounded"
              >
                {filterVisible ? 'Hide Filters' : 'Filter'}
              </button>
            </div>
          </div>
          {filterVisible && (
            <div className="flex flex-col space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Patient name"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.name}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
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
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Patient phone"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.phone}
                />
              </div>
              <div>
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                  onClick={applyFilters}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Department</th>
                <th className="py-2 px-4 border-b">Doctor</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient) => (
                <tr key={patient._id} className="border-b">
                  <td className="py-2 px-4">{patient.patient}</td>
                  <td className="py-2 px-4">{patient.email}</td>
                  <td className="py-2 px-4">{patient.department}</td>
                  <td className="py-2 px-4">{patient.doctor}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/pages/casestudies/${patient._id}`}
                      className="bg-slate-400 text-black px-4 py-2 rounded hover:bg-slate-600"
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
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <div>
              {Array.from({ length: Math.ceil(patients.length / patientsPerPage) }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} rounded`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(patients.length / patientsPerPage)}
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

export default PatientCaseStudies;
