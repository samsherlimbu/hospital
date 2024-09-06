import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  filterVisible: false,
  showAddAdminForm: false,
  filters: {
    fullName: '',
    email: '',
    phoneNumber: ''
  },
  admins: [],
  alladmins: []
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
    },
    toggleFilterVisibility(state) {
      state.filterVisible = !state.filterVisible;
    },
    toggleAddAdminForm(state) {
      state.showAddAdminForm = !state.showAddAdminForm;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    setAdmins(state, action) {
      state.admins = action.payload;
      state.alladmins = action.payload; // Set both admins and alladmins when fetching
    },
    applyFilters(state) {
      state.admins = state.alladmins.filter(admin => 
        admin.fullName.toLowerCase().includes((state.filters.fullName || '').toLowerCase()) &&
        admin.email.toLowerCase().includes((state.filters.email || '').toLowerCase()) &&
        (state.filters.phoneNumber ? admin.phoneNumber.includes(state.filters.phoneNumber) : true)
      );
      state.currentPage = 1; // Reset pagination when filters are applied
    }
  }
});

export const {
  toggleFilterVisibility,
  toggleAddAdminForm,
  setPage,
  setFilters,
  setAdmins, // Corrected here
  applyFilters
} = adminSlice.actions;

export default adminSlice.reducer;
