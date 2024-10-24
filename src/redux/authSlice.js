import { getCurrentUserAndToken } from "@/service/token";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getCurrentUserAndToken(),
  },
  reducers: {
    setAuth: (state, { payload }) => {
      state.user = payload;
    },
    removeAuth: (state) => {
      state.user = null;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;

export const selectAuth = (state) => state.auth.user;
export default authSlice.reducer;
