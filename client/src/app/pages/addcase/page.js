'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddCase = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    patient: '',
    email: '',
    department: '',
    doctor: '',
    diseases: [{ id: Date.now(), name: '' }],
  });

  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDepartmentsAndDoctors();
  }, []);

  const fetchDepartmentsAndDoctors = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}usersdoctor`);
      const departments = [...new Set(data.map((doctor) => doctor.department))];
      setDepartments(departments);
      setDoctors(data);
    } catch (error) {
      console.error("Error fetching departments and doctors:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDiseaseChange = (id, value) => {
    setFormData((prevData) => ({
      ...prevData,
      diseases: prevData.diseases.map((disease) =>
        disease.id === id ? { ...disease, name: value } : disease
      ),
    }));
  };

  const addDiseaseField = () => {
    setFormData((prevData) => ({
      ...prevData,
      diseases: [...prevData.diseases, { id: Date.now(), name: '' }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}patient-case`, formData);
      alert('Patient case added successfully!');
    } catch (error) {
      console.error('Error adding patient case:', error);
    }
  };

  const filteredDoctors = doctors.filter(
    (doctor) => doctor.department === formData.department
  );

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full h-full">
      <div className="bg-slate-200 p-8 rounded-md shadow-md w-[80%]">
        <h1 className="mb-6 text-2xl font-bold text-center">Add Patient Case Studies</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="department">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a department</option>
              {departments.map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="doctor">
              Doctor <span className="text-red-500">*</span>
            </label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select a doctor</option>
              {filteredDoctors.map((doctor) => (
                <option key={doctor._id} value={doctor.fullName}>{doctor.fullName}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="patient">
              Patient Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="patient"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Patient Name"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email"
            />
          </div>
          {formData.diseases.map((disease, index) => (
            <div key={disease.id} className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor={`disease-${disease.id}`}>
                Disease {index + 1}
              </label>
              <input
                type="text"
                id={`disease-${disease.id}`}
                name={`disease-${disease.id}`}
                value={disease.name}
                onChange={(e) => handleDiseaseChange(disease.id, e.target.value)}
                className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter disease"
              />
            </div>
          ))}
          <div className="col-span-1 md:col-span-2">
            <button
              type="button"
              onClick={addDiseaseField}
              className="bg-green-500 text-white px-4 py-2 rounded mt-2"
            >
              Add Disease
            </button>
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCase;
