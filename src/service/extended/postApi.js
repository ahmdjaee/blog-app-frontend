import { objectToFormData } from "@/lib/utils";
import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPost: builder.query({
      query: (params) => ({
        url: "/posts",
        method: "GET",
        params: params,
      }),
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: ({ ...body }) => ({
        url: "/posts",
        method: "POST",
        body: objectToFormData(body),
      }),

      invalidatesTags: ["Post"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    updatePost: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/posts/${id}`,
        method: "POST",
        body: objectToFormData({ _method: "PUT", ...body }),
      }),
      invalidatesTags: ["Post"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetPostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi;
