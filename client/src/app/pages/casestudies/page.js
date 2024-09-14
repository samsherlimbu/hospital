'use client';
import React, { useEffect } from 'react';
import axios from 'axios';
import AddCase from '../addcase/page';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, setFilters, setcase, toggleFilterVisibility, toggleAddCaseForm, applyFilters, setallCase } from '@/redux/reducerSlices/caseSlice';

const CaseCaseStudies = () => {
  const dispatch = useDispatch();

  // Accessing state from Redux store
  const {
    currentPage,
    case: cases,
    filters,
    filterVisible,
    showAddCaseForm,
    
  } = useSelector((state) => state.case);

  const casesPerPage = 5;

  useEffect(() => {
    fetchCase();
  }, []);

  const fetchCase = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}patient-cases`);
      dispatch(setcase(data.data)); // Set filtered case studies
      dispatch(setallCase(data.data)); // Set all case studies for future filtering
    } catch (error) {
      console.error("Error fetching Case case studies:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const applyFilterChanges = () => {
    dispatch(applyFilters());
  };

  const toggleFilter = () => {
    dispatch(toggleFilterVisibility());
  };

  const toggleAddCase = () => {
    dispatch(toggleAddCaseForm());
  };

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentcases = cases.slice(indexOfFirstCase, indexOfLastCase);

  const paginate = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  return (
    <div className="container mx-auto p-4">
      {showAddCaseForm ? (
        <AddCase onCancel={toggleAddCase} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={toggleAddCase}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Case Case Studies
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
                  name="fullName"
                  placeholder="Case name"
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
                  placeholder="Case email"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.email}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Case phone"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.phoneNumber}
                />
              </div>
              <div>
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                  onClick={applyFilterChanges}
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
              {currentcases.map((Case) => (
                <tr key={Case._id} className="border-b">
                  <td className="py-2 px-4">{Case.patient}</td>
                  <td className="py-2 px-4">{Case.email}</td>
                  <td className="py-2 px-4">{Case.department}</td>
                  <td className="py-2 px-4">{Case.doctor}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/pages/casestudies/${Case._id}`}
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
              {Array.from({ length: Math.ceil(cases.length / casesPerPage) }, (_, i) => (
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
              disabled={currentPage === Math.ceil(cases.length / casesPerPage)}
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

export default CaseCaseStudies;
