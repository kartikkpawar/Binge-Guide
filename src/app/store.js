import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabs";
import authReducer from "./auth";

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    auth: authReducer,
  },
});
