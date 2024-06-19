// redux/reducerSlices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  filterVisible: false,
  showAddPatientForm: false,
  filters: {
    fullName: '',
    email: '',
    phoneNumber: ''
  },
  patients: [],
  allPatients: []
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    toggleFilterVisibility(state) {
      state.filterVisible = !state.filterVisible;
    },
    toggleAddPatientForm(state) {
      state.showAddPatientForm = !state.showAddPatientForm;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPatients(state, action) {
      state.patients = action.payload;
    },
    setAllPatients(state, action) {
      state.allPatients = action.payload;
    },
    applyFilters(state) {
        state.patients = state.allPatients.filter(patient =>
          (patient.fullName.toLowerCase().includes((state.filters.fullName || '').toLowerCase()) &&
          patient.email.toLowerCase().includes((state.filters.email || '').toLowerCase()) &&
          (state.filters.phone ? patient.phoneNumber.includes(state.filters.phone) : true)
        ));
        state.currentPage = 1;
      }
      
  }
});

export const {
  toggleFilterVisibility,
  toggleAddPatientForm,
  setPage,
  setFilters,
  setPatients,
  setAllPatients,
  applyFilters
} = formSlice.actions;

export default formSlice.reducer;
