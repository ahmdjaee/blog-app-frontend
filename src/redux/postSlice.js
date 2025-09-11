import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  params: {
    limit: 20,
    page: 1,
    published: 1,
  },
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostParams: (state, { payload }) => {
      state.params = payload;
    },
    resetPostParams: () => initialState,
    // removePost: (state) => {
    //   state.user = null;
    // },
  },
});

export const { setPostParams, resetPostParams } = postSlice.actions;

export const selectPost = (state) => state.post.params;
export default postSlice.reducer;
