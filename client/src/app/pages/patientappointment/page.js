'use client'
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '@/socket/socket';
import axios from 'axios';
import {
  setPage,
  setPatients,
} from "@/redux/reducerSlices/formSlice";

const PatientAppointment = () => {
  const [patientsPerPage] = useState(5);
  const dispatch = useDispatch();

  const {
    currentPage,
    patients,
  } = useSelector((state) => state.form);

  useEffect(() => {
    // Fetch existing appointments when component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}appointments`);
        dispatch(setPatients(response.data)); // Use dispatch to set patients in Redux store
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();

    // Listen for 'update-appointments' event to receive new appointments
    socket.on('update-appointments', (newAppointment) => {
      dispatch(setPatients([...patients, newAppointment])); // Update patients state in Redux
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('update-appointments');
    };
  }, [dispatch, patients]);

  const indexOfLastPatients = currentPage * patientsPerPage;
  const indexOfFirstPatients = indexOfLastPatients - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatients, indexOfLastPatients);

  const paginate = (pageNumber) => {
    dispatch(setPage(pageNumber)); // Use dispatch to set the current page in Redux
  };

  const handleStatusChange = async (id, status) => {
    try {
      if (status === 'rejected') {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}appointments/${id}`);
        dispatch(setPatients(patients.filter(patient => patient._id !== id))); // Remove rejected patient from Redux state
      } else {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}appointments/${id}`, { status });
        dispatch(setPatients(
          patients.map(patient =>
            patient._id === id ? { ...patient, status: response.data.appointment.status } : patient
          )
        ));
      }
    } catch (error) {
      console.error(`Error ${status === 'rejected' ? 'deleting' : 'updating'} appointment:`, error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className='text-center'>Online Patient Appointments</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4">Doctor's Name</th>
            <th className="py-2 px-4">Patient's Name</th>
            <th className="py-2 px-4">Appointment Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPatients.map((item) => (
            <tr key={item._id} className="border-b">
              <td className="py-2 px-4">{item.doctor}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.appointmentDate}</td>
              <td className="py-2 px-4 text-center">
                {item.status === 'accepted' ? (
                  <span className="text-green-500 font-bold">Accepted</span>
                ) : (
                  <>
                    <button onClick={() => handleStatusChange(item._id, 'accepted')} className="mr-2 bg-green-500 text-white px-2 py-1 rounded">
                      Accept
                    </button>
                    <button onClick={() => handleStatusChange(item._id, 'rejected')} className="bg-red-500 text-white px-2 py-1 rounded">
                      Reject
                    </button>
                  </>
                )}
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
    </div>
  );
};

export default PatientAppointment;
