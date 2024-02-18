import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/user/userSlice.js";

const store = configureStore({
  reducer: {
    // Add reducers here
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
