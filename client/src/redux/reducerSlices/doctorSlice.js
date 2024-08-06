// redux/reducerSlices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  filterVisible: false,
  showAddDoctorForm: false,
  filters: {
    fullName: '',
    email: '',
    phoneNumber: ''
  },
  doctors: [],
  // allDoctors: []
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    toggleFilterVisibility(state) {
      state.filterVisible = !state.filterVisible;
    },
    toggleAddDoctorForm(state) {
      state.showAddDoctorForm = !state.showAddDoctorForm;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setDoctors(state, action) {
      state.doctors = action.payload;
    },
    // setAllDoctors(state, action) {
    //   state.allDoctors = action.payload;
    // },
    applyFilters(state) {
        state.doctors = state.doctors.filter(doctors =>
          (doctors.fullName.toLowerCase().includes((state.filters.fullName || '').toLowerCase()) &&
          doctors.email.toLowerCase().includes((state.filters.email || '').toLowerCase()) &&
          (state.filters.phone ? doctors.phoneNumber.includes(state.filters.phone) : true)
        ));
        state.currentPage = 1;
      }
      
  }
});

export const {
  toggleFilterVisibility,
  toggleAddDoctorForm,
  setPage,
  setFilters,
  setDoctors,
  // setAllDoctors,
  applyFilters
} = doctorSlice.actions;



export default doctorSlice.reducer;
