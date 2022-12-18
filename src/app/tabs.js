import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: true,
  freeWatch: false,
  discover: false,
  comingSoon: false,
  favourites: false,
  watchlist: false,
  tvShows: false,
  movies: true,
};

export const tabsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state[action.payload.tabName] = true;
      state[action.payload.currTab] = false;
    },
    loadHome: (state) => {
      state.home = true;
      state.freeWatch = false;
      state.discover = false;
      state.comingSoon = false;
      state.favourites = false;
      state.watchlist = false;
      state.tvShows = false;
      state.movies = true;
    },
  },
});

export const { changeTab, loadHome } = tabsSlice.actions;

export default tabsSlice.reducer;
