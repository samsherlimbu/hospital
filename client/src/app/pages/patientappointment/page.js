'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '@/socket/socket';
import axios from 'axios';
import { setPage, setAppointments } from '@/redux/reducerSlices/appointmentSlice';

const PatientAppointment = () => {
  const [appointmentsPerPage] = useState(5);
  const dispatch = useDispatch();
  const { currentPage, Appointments } = useSelector((state) => state.appointments);

  useEffect(() => {
    // Fetch existing appointments when component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}appointments`);
        
        dispatch(setAppointments(response.data));
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();

    // Listen for 'update-appointments' event to receive new appointments
    socket.on('update-appointments', (newAppointment) => {
      console.log('New appointment received:', newAppointment);
      dispatch(setAppointments([...Appointments, newAppointment]));
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.off('update-appointments');
    };
  }, [dispatch, Appointments]);

  const indexOfLastAppointments = currentPage * appointmentsPerPage;
  const indexOfFirstAppointments = indexOfLastAppointments - appointmentsPerPage;
  const currentAppointments = Appointments.slice(indexOfFirstAppointments, indexOfLastAppointments);

  const paginate = (pageNumber) => {
    dispatch(setPage(pageNumber));
  };

  const handleStatusChange = async (id, status) => {
    try {
      if (status === 'rejected') {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}appointments/${id}`);
        dispatch(setAppointments(Appointments.filter(patient => patient._id !== id)));
      } else {
        const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}appointments/${id}`, { status });
        dispatch(setAppointments(
          Appointments.map(patient =>
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
      <h2 className="text-center">Online Patient Appointments</h2>
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
          {currentAppointments.map((item) => (
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
          {Array.from({ length: Math.ceil(Appointments.length / appointmentsPerPage) }, (_, i) => (
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
          disabled={currentPage === Math.ceil(Appointments.length / appointmentsPerPage)}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PatientAppointment;
