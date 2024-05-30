import React from 'react';

const Disease = [
  'Food Allergy', 'Heart Disease', 'High Blood Pressure', 'Diabetic', 'Surgery', 'Accidental', 'Others', 'Family Medical History', 'Current Medication', 'Pregnancy', 'Breast Feeding', 'Health Insurance'
];
const patient = [
  'Mr John', 'Mr Ram', 'Mr Rock', 'Mr Green'
];

const AddCase = ({ onCancel }) => {
  return (
    <div className="flex items-center justify-center bg-gray-100 w-full h-full">
      <div className="bg-slate-200 p-8 rounded-md shadow-md w-[80%]">
        <h1 className="mb-6 text-2xl font-bold text-center">Add Patient Case Studies</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="patient">Name <span className="text-red-500">*</span></label>
            <select id="patient" name="patient" required className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <option value="">Select a patient</option>
              {patient.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div className="col-span-1 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email <span className="text-red-500">*</span></label>
            <input type="email" id="email" name="email" required className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email" />
          </div>
          {Disease.map((item, id) => (
            <div key={id} className="col-span-1">
              <label className="block text-sm font-medium text-gray-700" htmlFor={item}>{item}</label>
              <input type="text" id={item} name={item} className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder={item} />
            </div>
          ))}
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
