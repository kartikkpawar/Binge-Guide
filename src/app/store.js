import { configureStore } from "@reduxjs/toolkit";
import tabsReducer from "./tabs";
import authReducer from "./auth";
import { mediaApi } from "./mediaApi";
import { actorsApi } from "./actorsApi";

export default configureStore({
  reducer: {
    tabs: tabsReducer,
    auth: authReducer,
    [mediaApi.reducerPath]: mediaApi.reducer,
    [actorsApi.reducerPath]: actorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mediaApi.middleware, actorsApi.middleware),
});
