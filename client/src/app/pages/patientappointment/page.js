import React, { useState } from 'react';

const PatientAppointment = () => {
    const allPatients = [
        { id: 1,Doctorsname:'indra', Patientsname: 'samsher', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0120',  },
        { id: 2,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0121',  },
        { id: 3,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0122',  },
        { id: 4,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0123',  },
        { id: 5,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0124',  },
        { id: 6,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0125',  },
        { id: 7,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0126',  },
        { id: 8,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0127',  },
        { id: 9,Doctorsname:'indra', Patientsname: 'Unknown', AppointmentDate: 'Patients@ambitiousit.com', AppointmentTime: '(406) 555-0128',  },
    ];

    const [Patients, setPatients] = useState(allPatients);
    const [currentPage, setCurrentPage] = useState(1);
    const [PatientsPerPage] = useState(5);

    
    const indexOfLastPatients = currentPage * PatientsPerPage;
    const indexOfFirstPatients = indexOfLastPatients - PatientsPerPage;
    const currentPatients = Patients.slice(indexOfFirstPatients, indexOfLastPatients);


    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="container mx-auto p-4">
  
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Id <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Doctors Name <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Patients Name <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">AppointmentDate <span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Visiting Time<span>↑↓</span></th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentPatients.map((items, index) => (
                        <tr key={index} className="border-b">
                            <td className="py-2 px-4">{items.id}</td>
                            <td className="py-2 px-4">{items.Doctorsname}</td>
                            <td className="py-2 px-4">{items.Patientsname}</td>
                            <td className="py-2 px-4">{items.AppointmentDate}</td>
                            <td className="py-2 px-4">{items.AppointmentTime}</td>
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
                    {Array.from({ length: Math.ceil(Patients.length / PatientsPerPage) }, (_, i) => (
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
                    disabled={currentPage === Math.ceil(Patients.length / PatientsPerPage)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default PatientAppointment;
