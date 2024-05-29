import React, { useState } from 'react';

const DoctorSchedule = () => {
    const allDoctors = [
        { id: 1, doctorname: 'samsher', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0120',  status: 'Active' },
        { id: 2, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0121',  status: 'Active' },
        { id: 3, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0122',  status: 'Active' },
        { id: 4, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0123',  status: 'Active' },
        { id: 5, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0124',  status: 'Active' },
        { id: 6, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0125',  status: 'Active' },
        { id: 7, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0126',  status: 'Active' },
        { id: 8, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0127',  status: 'Active' },
        { id: 9, doctorname: 'Unknown', weekday: 'doctor@ambitiousit.com', visitingtime: '(406) 555-0128',  status: 'Active' },
    ];

    const [doctors, setDoctors] = useState(allDoctors);
    const [currentPage, setCurrentPage] = useState(1);
    const [doctorsPerPage] = useState(5);

    
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
    const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);


    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
  
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Id <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Doctor Name <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Weekday <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Visiting Time<span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Status <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDoctors.map((doctor, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4">{doctor.id}</td>
                            <td className="py-2 px-4">{doctor.doctorname}</td>
                            <td className="py-2 px-4">{doctor.weekday}</td>
                            <td className="py-2 px-4">{doctor.visitingtime}</td>
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

export default DoctorSchedule;
