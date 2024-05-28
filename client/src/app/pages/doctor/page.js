import React, { useState } from 'react';

const DoctorTable = () => {
    const allDoctors = [
        { id: 1, name: 'samsher', email: 'doctor@ambitiousit.com', phone: '(406) 555-0120', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 2, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0121', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 3, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0122', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 4, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0123', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 5, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0124', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 6, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0125', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 7, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0126', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 8, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0127', department: 'Outpatient department (OPD)', status: 'Active' },
        { id: 9, name: 'Unknown', email: 'doctor@ambitiousit.com', phone: '(406) 555-0128', department: 'Outpatient department (OPD)', status: 'Active' },
    ];

    const [doctors, setDoctors] = useState(allDoctors);
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState({ name: '', email: '', phone: '' });

    
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

 
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    
    const applyFilters = () => {
        setDoctors(
            allDoctors.filter(doctor =>
                doctor.name.toLowerCase().includes(filters.name.toLowerCase()) &&
                doctor.email.toLowerCase().includes(filters.email.toLowerCase()) &&
                doctor.phone.includes(filters.phone)
            )
        );
        setCurrentPage(1); // Reset to the first page after filtering
    };

    // Toggle the visibility of the filter form
    const toggleFilter = () => {
        setFilterVisible(!filterVisible);//if visible it make  unvisible and vice versa
    };

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
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
                        <th className="py-2 px-4 border-b">Name <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Email <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Phone <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Department <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Status <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDoctors.map((doctor, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4">{doctor.id}</td>
                            <td className="py-2 px-4">{doctor.name}</td>
                            <td className="py-2 px-4">{doctor.email}</td>
                            <td className="py-2 px-4">{doctor.phone}</td>
                            <td className="py-2 px-4">{doctor.department}</td>
                            <td className="py-2 px-4 text-red-500">{doctor.status}</td>
                            <td className="py-2 px-4 text-center"><span className="cursor-pointer">👁️</span></td>
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
                    {Array.from({ length: Math.ceil(doctors.length / doctorsPerPage) }, (_, i) => (
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
                    disabled={currentPage === Math.ceil(doctors.length / doctorsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default DoctorTable;
