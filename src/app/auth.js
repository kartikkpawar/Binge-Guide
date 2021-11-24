import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth: false,
};

export const tabsSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    signInUser: (state, action) => {
      state.auth = action.payload;
    },
    signOutUSer: (state) => {
      state.auth = false;
    },
  },
});

export const { signInUser, signOutUSer } = tabsSlice.actions;

export default tabsSlice.reducer;
