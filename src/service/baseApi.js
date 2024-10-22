import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCurrentUserAndToken, removeUserAndToken } from "./token";
import { notification } from "antd";

export const handleResponse = () => (next) => (action) => {
  if (isFulfilled(action)) {
    const type = action?.meta?.arg?.type;

    switch (type) {
      case "mutation": {
        notification.success({
          message: "Success",
          description: action?.payload?.message,
        });
      }
    }
  }

  if (isRejectedWithValue(action)) {
    const status = action?.payload?.status;

    switch (status) {
      case 401: {
        removeUserAndToken();

        break;
      }
      case "FETCH_ERROR": {
        break;
      }
    }
  }

  return next(action);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  // tagTypes: ["Users"],
  // keepUnusedDataFor: 60,
  // refetchOnMountOrArgChange: 60, // refetch saat component mount
  refetchOnMountOrArgChange: false,
  // refetchOnFocus: true, // refetch kalau tab window browser fokus, (berlaku jika true)
  refetchOnReconnect: true, // refetch kalau terhubung ke server, (berlaku jika true)
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL + "/api",
    prepareHeaders: (headers) => {
      const token = getCurrentUserAndToken()?.token;

      headers.set("Accept", "application/json");
      if (token) headers.set("Authorization", `Bearer ${token}`);
    },
  }),
  endpoints: (builder) => ({
    getBase: builder.query({
      query: ({ url, params }) => ({
        url: url,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetBaseQuery, usePrefetch } = baseApi;
