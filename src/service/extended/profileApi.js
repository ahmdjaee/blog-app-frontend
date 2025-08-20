import { setAuth } from "@/redux/authSlice";
import { baseApi } from "../baseApi";
import { errorHandler } from "../errorHandler";
import { setUserAndToken } from "../token";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (params) => ({
        url: "/profile",
        method: "GET",
        params: { ...params },
      }),
      providesTags: ["Profile"],
    }),
    updateSocial: builder.mutation({
      query: (body) => ({
        url: "/profile/socials",
        method: "POST",
        body: body,
      }),

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;

          setUserAndToken(res?.data);
          dispatch(setAuth(res?.data));
        } catch (e) {
          console.error(e);
        }
      },

      transformErrorResponse: (response) => errorHandler(response),
    }),
    updateProfile: builder.mutation({
      query: ({ ...body }) => ({
        url: `/profile`,
        method: "PATCH",
        body: body,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          setUserAndToken(res?.data);
          dispatch(setAuth(res?.data));
        } catch (e) {
          console.error(e);
        }
      },
      transformErrorResponse: (response) => errorHandler(response),
    }),
    deleteProfile: builder.mutation({
      query: (id) => ({
        url: `/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Profile"],
      transformErrorResponse: (response) => errorHandler(response),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateSocialMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,
} = profileApi;
