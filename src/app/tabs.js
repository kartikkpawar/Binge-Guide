import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: true,
  freeWatch: false,
  discover: false,
  comingSoon: false,
  favourites: false,
  watchlist: false,
  tvShows: true,
  movies: false,
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

export const { changeTab } = tabsSlice.actions;

export default tabsSlice.reducer;
