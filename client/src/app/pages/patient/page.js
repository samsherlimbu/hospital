import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import AddPatientForm from "../addpatient/page";
import { toggleAddPatientForm, toggleFilterVisibility,setPage } from "@/redux/reducerSlices/formSlice";
import { useDispatch, useSelector } from "react-redux";


const Patient = () => {
  const allPatients = [
    { id: 1, name: 'samsher', email: 'samsher@gmail.com', phone: '0123456788', status: 'active' },
    { id: 2, name: 'ram', email: 'ram@gmail.com', phone: '0123456788', status: 'active' },
    { id: 3, name: 'hari', email: 'hari@gmail.com', phone: '0123456788', status: 'active' },
    { id: 4, name: 'indra', email: 'indra@gmail.com', phone: '0123456788', status: 'active' },
    { id: 5, name: 'ramesh', email: 'ramesh@gmail.com', phone: '0123456788', status: 'active' },
    { id: 6, name: 'anish', email: 'anish@gmail.com', phone: '0123456788', status: 'active' },
    { id: 7, name: 'sakar', email: 'sakar@gmail.com', phone: '0123456788', status: 'active' },
    { id: 8, name: 'bishal', email: 'bishal@gmail.com', phone: '0123456788', status: 'active' },
  ];

  const dispatch = useDispatch();
  const { filterVisible ,showAddPatientForm,currentPage } = useSelector((state) => state.form);

  const [patientsPerPage] = useState(5);
  const [patients, setPatients] = useState(allPatients);
  const [filters, setFilters] = useState({ name: '', email: '', phone: '' });
  
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    setPatients(
      allPatients.filter(patient =>
        patient.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        patient.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        patient.phone.includes(filters.phone)
      )
    );
    dispatch(setPage(1)); // Reset to the first page after filtering
  };

 

  const paginate = (pageNumber) => dispatch(setPage(pageNumber));

  return (
    <div className="container mx-auto p-4">
      {showAddPatientForm ? (
        <AddPatientForm onCancel={() => dispatch(toggleAddPatientForm())} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => dispatch(toggleAddPatientForm())}
              >
                Add Patient
              </button>
            </div>
            <div>
              <button onClick={()=>dispatch(toggleFilterVisibility())} className="btn-filter bg-blue-500 text-white px-4 py-2 rounded">Filter</button>
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
                <th className="py-2 px-4 border-b">Name <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Email <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Phone <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Status <span>↑↓</span></th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{patient.id}</td>
                  <td className="py-2 px-4">{patient.name}</td>
                  <td className="py-2 px-4">{patient.email}</td>
                  <td className="py-2 px-4">{patient.phone}</td>
                  <td className="py-2 px-4 text-red-500">{patient.status}</td>
                  <td className="py-2 px-4 text-center">
                    <span className="cursor-pointer space-x-2">
                      <Button>edit</Button>
                      <Button>Delete</Button>
                      <Button>Details</Button>
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

export default Patient;