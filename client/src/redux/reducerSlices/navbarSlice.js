import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIconClicked: false,
  isLoggedIn: false,
  showDropdown: null,
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleUserIcon(state) {
      state.userIconClicked = !state.userIconClicked;
    },
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setShowDropdown(state, action) {
      state.showDropdown = action.payload;
    },
    hideDropdown(state) {
      state.showDropdown = null;
    },
  },
});

export const { toggleUserIcon, setLoggedIn, setShowDropdown, hideDropdown } = navbarSlice.actions;
export default navbarSlice.reducer;
