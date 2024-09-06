'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterVisibility, setPage, setFilters, setAdmins, applyFilters, toggleAddAdminForm } from '@/redux/reducerSlices/adminsSlice';
import axios from 'axios';
import AddAdmin from '@/app/pages/addadmin/page';
import Link from 'next/link';

const AdminInfo = () => {
  const dispatch = useDispatch();
  const { filterVisible, showAddAdminForm, currentPage, filters, admins } = useSelector((state) => state.admin);

  // Fetch all admins when the component mounts
  useEffect(() => {
    const fetchAllAdmins = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Admin-Users`);
        dispatch(setAdmins(data)); // Populate both admins and alladmins
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAllAdmins();
  }, [dispatch]);

  const adminPerPage = 5;
  const indexOfLastAdmin = currentPage * adminPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminPerPage;
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin);

  // Handle filter input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  // Handle applying filters
  const handleApplyFilters = () => {
    dispatch(applyFilters());
  };

  // Handle pagination
  const handlePaginate = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  // Handle delete admin
  const handleDelete = async (id) => {
    try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}delete/${id}`);
        // Fetch updated admins list after deletion
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}Admin-Users`);
        dispatch(setAdmins(data)); // Update state with the new list of admins
    } catch (error) {
        console.error('Error deleting admin:', error);
    }
};


  return (
    <div className="container mx-auto p-4">
      {showAddAdminForm ? (
        <AddAdmin onCancel={() => dispatch(toggleAddAdminForm())} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                onClick={() => dispatch(toggleAddAdminForm())}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Admin
              </button>
            </div>
            <div>
              <button
                onClick={() => dispatch(toggleFilterVisibility())}
                className="btn-filter bg-blue-500 text-white px-4 py-2 rounded"
              >
                {filterVisible ? 'Hide Filters' : 'Show Filters'}
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
                  placeholder="Admin name"
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
                  placeholder="Admin email"
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
                  placeholder="Admin phone number"
                  className="px-4 py-2 border rounded w-full"
                  onChange={handleInputChange}
                  value={filters.phoneNumber}
                />
              </div>
              <div>
                <button
                  className="bg-teal-500 text-white px-4 py-2 rounded"
                  onClick={handleApplyFilters}
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
                <th className="py-2 px-4 border-b">Phone</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin) => (
                <tr key={admin._id} className="border-b">
                  <td className="py-2 px-4">{admin.fullName}</td>
                  <td className="py-2 px-4">{admin.email}</td>
                  <td className="py-2 px-4">{admin.phoneNumber}</td>
                  <td className="py-2 px-4">
                    <Link
                      href={`/pages/Addinfo/${admin._id}`}
                      className="bg-slate-400 text-black px-4 py-2 rounded hover:bg-slate-600 mr-2"
                    >
                      Details
                    </Link>
                    <button
                      onClick={() => handleDelete(admin._id)} // Ensure this is a function reference
                      className="bg-slate-400 text-black px-4 py-2 rounded hover:bg-slate-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => handlePaginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
            <div>
              {Array.from({ length: Math.ceil(admins.length / adminPerPage) }, (_, i) => (
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
              disabled={currentPage === Math.ceil(admins.length / adminPerPage)}
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

export default AdminInfo;
