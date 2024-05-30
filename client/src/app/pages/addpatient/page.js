import React from 'react';

const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "B+", "O+", "AB+", "A-", "B-", "O-", "AB-"];
const status =["Active", "Inactive"]

const AddPatientForm = ({ onCancel }) => {
  return (
    <div className=" flex items-center justify-center bg-gray-100 w-full h-full">
      <div className="bg-slate-200 p-8 rounded-md shadow-md w-[80%] ">
        <h1 className="mb-6 text-2xl font-bold text-center">Add Patient</h1>
        <form className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name">Name <span className="text-red-500">*</span></label>
            <input type="text" id="name" name="name" required className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Name" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email <span className="text-red-500">*</span></label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password <span className="text-red-500">*</span></label>
              <input type="password" id="password" name="password" required className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Phone Number" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="gender">Gender</label>
              <select id="gender" name="gender" className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {genders.map((item, id) => (
                  <option value={item} key={id}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="blood-group">Blood Group</label>
              <select id="blood-group" name="blood-group" className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {bloodGroups.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-1 flex justify-center border-2 border-dashed border-gray-300 rounded-md py-6 px-6">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M24 0v48M0 24h48" />
                </svg>
                <div className="flex text-sm text-gray-600 mt-2">
                  <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">Address</label>
            <textarea id="address" name="address" rows="3" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Address"></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="gender">Date of Birth <span className='text-red-300'>*</span></label>
              <input type="date" required className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700" htmlFor="blood-group">Status <span className='text-red-300'>*</span></label>
              <select  className="mt-1 block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                {status.map((item, index) => (
                  <option value={item} key={index}>{item}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Patient</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatientForm;
