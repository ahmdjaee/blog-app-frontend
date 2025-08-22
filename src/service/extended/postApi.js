import { objectToFormData } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (args) => ({
        url: args?.url ? `/${args.url}` : "/posts",
        method: "GET",
        params: args?.params,
      }),
      providesTags: ["Posts"],
    }),
    getPost: builder.query({
      query: (args) => ({
        url: args.url ? `/posts/${args.url}` : "/posts",
        method: "GET",
        params: args?.params,
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: ({ ...body }) => ({
        url: "/posts",
        method: "POST",
        body: objectToFormData(body),
      }),

      invalidatesTags: ["Posts"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    updatePost: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "POST",
        body: objectToFormData({ _method: "PUT", ...body }),
      }),
      invalidatesTags: ["Posts"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Posts", "Post"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
} = postApi;
