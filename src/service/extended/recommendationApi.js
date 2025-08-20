import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";

const recommendationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecommendations: builder.query({
      query: () => "/recommendations",
      providesTags: ["Recommendations"],
    }),
    createRecommendation: builder.mutation({
      query: (body) => ({
        url: "/recommendations",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Recommendations"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    updateRecommendation: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/recommendations/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Recommendations"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deleteRecommendation: builder.mutation({
      query: (id) => ({
        url: `/recommendations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recommendations"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetRecommendationsQuery,
  useCreateRecommendationMutation,
  useUpdateRecommendationMutation,
  useDeleteRecommendationMutation,
} = recommendationApi;
