import { objectToFormData } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";
import { postApi } from "./postApi";
import { store } from "@/redux/store";

export const bookmarkApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookmark: builder.query({
      query: ({ url = "", params = {} }) => ({
        url: "/bookmarks" + (url !== "" ? `/${url}` : ""),
        method: "GET",
        params: params,
      }),
      providesTags: ["Bookmark"],
    }),
    toggleBookmark: builder.mutation({
      query: ({ ...body }) => ({
        url: "/bookmarks/toggle",
        method: "POST",
        body: objectToFormData(body),
      }),
       // post_id adalah payload dari toggleBookmark
      async onQueryStarted({ post_id }, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;

          const posts = baseApi.util.selectInvalidatedBy(store.getState(), [{ type: "Posts" }]);
          const post = baseApi.util.selectInvalidatedBy(store.getState(), [{ type: "Post" }]);

          dispatch(
            postApi.util.updateQueryData("getPost", post[0]?.originalArgs, (draft) => {
              const posts = draft?.data;
              posts.marked = res.data;
            })
          );

          posts.forEach((post) => {
            dispatch(
              postApi.util.updateQueryData("getPosts", post.originalArgs, (draft) => {
                const posts = draft?.data;
                const postIndex = posts?.findIndex(
                  (post) => parseInt(post?.id) === parseInt(post_id)
                );
                if (postIndex !== -1) {
                  posts[postIndex].marked = res.data;
                }
              })
            );
          });
        } catch (e) {
          console.error(e);
        }
      },
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const { useGetBookmarkQuery, useToggleBookmarkMutation } = bookmarkApi;
