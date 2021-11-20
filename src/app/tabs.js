import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: true,
  ott: false,
  discover: false,
  comingSoon: false,
  favourites: false,
  watchlist: false,
};

export const tabsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state[action.payload.tabName] = true;
      state[action.payload.currTab] = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeTab } = tabsSlice.actions;

export default tabsSlice.reducer;
