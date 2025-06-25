import { configureStore } from "@reduxjs/toolkit";
import timeTableHomeworkReducer from "../src/slices/timeTableHomeworkSlice.js";
import authReducer from "../src/slices/authSlice.js";

const store = configureStore({
  reducer: {
    timeTableHomework: timeTableHomeworkReducer,
    auth: authReducer,
  },
});

export default store;
