// redux/reducerSlices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  filterVisible: false,
  showAddCaseForm: false,
  filters: {
    fullName: '',
    email: '',
    phoneNumber: ''
  },
  case: [],
  allCase: []
};

const caseSlice = createSlice({
  name: 'case',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    toggleFilterVisibility(state) {
      state.filterVisible = !state.filterVisible;
    },
    toggleAddCaseForm(state) {
      state.showAddCaseForm = !state.showAddCaseForm;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setcase(state, action) {
      state.case = action.payload;
    },
    setallCase(state, action) {
      state.allCase = action.payload;
    },
    applyFilters(state) {
        state.case = state.allCase.filter(patient =>
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
  toggleAddCaseForm,
  setPage,
  setFilters,
  setcase,
  setallCase,
  applyFilters
} = caseSlice.actions;

export default caseSlice.reducer;
