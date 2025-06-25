import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  message: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setUnAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setAuth, setUnAuth, setMessage } = authSlice.actions;
export default authSlice.reducer;
