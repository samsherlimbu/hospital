import React, { useState } from "react";
import { Button } from "@nextui-org/react";

const Prescription = () => {
  const allPrescription = [
    { id: 1, name: 'samsher', email: 'samsher@gmail.com', phone: '0123456788', status: 'active' },
    { id: 2, name: 'ram', email: 'ram@gmail.com', phone: '0123456788', status: 'active' },
    { id: 3, name: 'hari', email: 'hari@gmail.com', phone: '0123456788', status: 'active' },
    { id: 4, name: 'indra', email: 'indra@gmail.com', phone: '0123456788', status: 'active' },
    { id: 5, name: 'ramesh', email: 'ramesh@gmail.com', phone: '0123456788', status: 'active' },
    { id: 6, name: 'anish', email: 'anish@gmail.com', phone: '0123456788', status: 'active' },
    { id: 7, name: 'sakar', email: 'sakar@gmail.com', phone: '0123456788', status: 'active' },
    { id: 8, name: 'bishal', email: 'bishal@gmail.com', phone: '0123456788', status: 'active' },
  ];

  const [PrescriptionPerPage] = useState(5);
  const [Prescription, setPrescription] = useState(allPrescription);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ name: '', email: '', phone: '' });
  const [filterVisible, setFilterVisible] = useState(false);

  const indexOfLastpres = currentPage * PrescriptionPerPage;
  const indexOfFirstpres = indexOfLastpres - PrescriptionPerPage;
  const currentPrescription = Prescription.slice(indexOfFirstpres, indexOfLastpres);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    setPrescription(
      allPrescription.filter(pres =>
        pres.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        pres.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        pres.phone.includes(filters.phone)
      )
    );
    setCurrentPage(1); // Reset to the first page after filtering
  };

  // Toggle the visibility of the filter form
  const toggleFilter = () => {
    setFilterVisible(!filterVisible); // if visible it make unvisible and vice versa
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
       <div className="flex items-center justify-between mb-4">
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Add pres case studies</button>
        </div>
        <div>
          <button onClick={toggleFilter} className="btn-filter bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>
      {filterVisible && (
        <div className="flex justify-between mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
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
            <button className="bg-teal-500 text-white px-4 py-2 rounded" onClick={applyFilters}>Submit</button>
          </div>
        </div>
      )}
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Id <span>↑↓</span></th>
            <th className="py-2 px-4 border-b">DoctorName <span>↑↓</span></th>
            <th className="py-2 px-4 border-b">PatientName <span>↑↓</span></th>
            <th className="py-2 px-4 border-b">Date <span>↑↓</span></th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPrescription.map((pres, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4">{pres.id}</td>
              <td className="py-2 px-4">{pres.name}</td>
              <td className="py-2 px-4">{pres.email}</td>
              <td className="py-2 px-4">{pres.phone}</td>
              <td className="py-2 px-4 text-center">
                <span className="cursor-pointer space-x-2">
                👁️
                </span>
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
          {Array.from({ length: Math.ceil(Prescription.length / PrescriptionPerPage) }, (_, i) => (
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
          disabled={currentPage === Math.ceil(Prescription.length / PrescriptionPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Prescription;
