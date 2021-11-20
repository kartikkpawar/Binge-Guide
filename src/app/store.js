import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabs";

export default configureStore({
  reducer: {
    tabs: tabsReducer,
  },
});
