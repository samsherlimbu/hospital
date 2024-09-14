// redux/reducerSlices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  filterVisible: false,
  Appointments: [],
  allAppointments: []
};

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
   
 
    setAppointments(state, action) {
      state.Appointments = action.payload;
    },
    setallAppointments(state, action) {
      state.allAppointments = action.payload;
    },
   
      
  }
});

export const {
  setPage,
  setAppointments,
  setallAppointments,
  applyFilters
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
