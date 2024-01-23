import { createSlice } from "@reduxjs/toolkit";

const authState = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    loggedIn(state) {
      state.isAuthenticated = true;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { loggedIn, loggedOut } = authSlice.actions;

export default authSlice.reducer;
