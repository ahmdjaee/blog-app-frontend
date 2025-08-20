import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    params: {
        limit: 15,
        page: 1,
        published: 1
    },
  },
  reducers: {
    setPostParams: (state, { payload }) => {
      state.params = payload;
    },
    // removePost: (state) => {
    //   state.user = null;
    // },
  },
});

export const { setPostParams } = postSlice.actions;

export const selectPost = (state) => state.post.params;
export default postSlice.reducer;
