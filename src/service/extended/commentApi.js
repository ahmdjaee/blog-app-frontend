import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";

const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCommentByPost: builder.query({
      query: (slug) => ({ url: `/comments/${slug}` }),
      providesTags: ["Comment"],
    }),
    getComments: builder.query({
      query: (params) => ({ url: "/comments", params: params }),
      providesTags: ["Comment"],
    }),
    createComment: builder.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Comment"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    sendComment: builder.mutation({
      query: (body) => ({
        url: "/comments",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Comment"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    updateComment: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/comments/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Comment"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    likeComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Comment"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useGetCommentByPostQuery,
  useSendCommentMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useLikeCommentMutation
} = commentApi;
