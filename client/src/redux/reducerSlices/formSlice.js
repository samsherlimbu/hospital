import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage: 1,
    filterVisible: false,
    showAddPatientForm: false,
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
        }
    }
});

export const { toggleFilterVisibility, toggleAddPatientForm, setPage } = formSlice.actions;
export default formSlice.reducer;
