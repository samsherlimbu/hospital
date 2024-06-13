import { user } from "@nextui-org/react";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userIconClicked: false,
  isLoggedIn: false,
  showDropdown: null,
  userDetails:{},
   token: ""
};

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    toggleUserIcon(state) {
      state.userIconClicked = !state.userIconClicked;
    },
    setLoginDetails(state, action) {
    const {user,token}= action.payload;
    return {
      ...state,
      isLoggedIn: true,
      userDetails:user,
      token:token
    }
    },
    setShowDropdown(state, action) {
      state.showDropdown = action.payload;
    },
    hideDropdown(state) {
      state.showDropdown = null;
    },
    logoutUser(state, actions) {
      return initialState
}
  },
});

export const { toggleUserIcon, setLoginDetails, setShowDropdown, hideDropdown,logoutUser } = navbarSlice.actions;
export default navbarSlice.reducer;
