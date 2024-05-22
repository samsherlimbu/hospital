import React from "react";

const Appointment = () => {
  const options = ["None", "gastrology", "pathology", "gyanology"];
  const options1 = ["None", "samsher", "kaylin", "aashish"];
  const gender = ["None", "male", "female", "other"];
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="border-t border-b border-blue-300 py-3">
        <h1 className="text-center font-extrabold text-4xl mb-7 text-blue-700">
          Book an Appointment
        </h1>
      </div>
      <form>
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl  mb-7 text-gray-600">
            Doctors Information
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Department*
              </label>
              <select className="block w-full  rounded-md shadow-sm border border-gray-400 hover:border-black">
                {options.map((items, index) => (
                  <option key={index} value={items}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Doctors*
              </label>
              <select className="block w-full  rounded-md shadow-sm border border-gray-400 hover:border-black">
                {options1.map((items, index) => (
                  <option key={index} value={items}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-7">
                Appointment Date *
              </label>
              <input
                type="date"
                className="block w-full  rounded-md shadow-sm border border-gray-400 hover:border-black"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-7">
                Appointment Time *
              </label>
              <input
                type="time"
                className="block w-full  rounded-md shadow-sm border border-gray-400 hover:border-black"
              />
            </div>
          </div>
        </div>
        <div className="mb-8">
          <h1 className="font-extrabold text-3xl mb-7 text-gray-600">
            Personal Information
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Name*
              </label>
              <input
                type="text"
                className="block w-full rounded-md shadow-sm border border-gray-400 hover:border-black"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Email*
              </label>
              <input
                type="text"
                className="block w-full rounded-md shadow-sm border border-gray-400 hover:border-black"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Number*
              </label>
              <input
                type="number"
                className="block w-full rounded-md shadow-sm border border-gray-400 hover:border-black"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Age *
              </label>
              <input
                type="number"
                className="block w-full rounded-md shadow-sm border border-gray-400 hover:border-black"
                min="0"
                max="120"
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mb-7">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Gender*
              </label>
              <select className="block w-full rounded-md shadow-sm border border-gray-400 hover:border-black">
                {gender.map((items, index) => (
                  <option key={index} value={items}>
                    {items}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-400 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Request for Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
