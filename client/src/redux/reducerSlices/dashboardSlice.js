// dashboardSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState ={
    activeSection: 'dashboard',
  }

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setSection } = dashboardSlice.actions;

export default dashboardSlice.reducer;
