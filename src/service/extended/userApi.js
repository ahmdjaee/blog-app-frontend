import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["User"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["User"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
