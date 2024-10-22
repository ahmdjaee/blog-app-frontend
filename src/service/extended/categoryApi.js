import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation({
      query: (body) => ({
        url: "/categories",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Category"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    updateCategory: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Category"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
