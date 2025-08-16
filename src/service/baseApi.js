import { removeAuth } from "@/redux/authSlice";
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { notification } from "antd";
import { getCurrentUserAndToken, removeUserAndToken } from "./token";
import { successHandler } from "./successHandler";

export const handleResponse = (api) => (next) => (action) => {
  if (isFulfilled(action)) {
    const type = action?.meta?.arg?.type;
    const endpoints = action?.meta?.arg?.endpointName;

    if (type === "mutation") {
      switch (endpoints) {
        case "likeComment": {
          break;
        }
        case "likePost": {
          break;
        }
        default: {
          successHandler(action?.payload);
        }
      }
    }

    // switch (endpoints) {
    //   case "likeComment": {
    //     return
    //   }
    // }

    // switch (type) {
    //   case "mutation": {
    //     notification.success({
    //       message: "Success",
    //       description: action?.payload?.message,
    //     });
    //   }
    // }
  }

  if (isRejectedWithValue(action)) {
    const status = action?.payload?.status;
    const responseStatus = action?.meta?.baseQueryMeta?.response?.status;

    if (status === 401 || responseStatus === 401) {
      if (api.getState().auth.user) {
        removeUserAndToken();
        api.dispatch(removeAuth());
        notification.error({
          message: "Unauthorized or session expired.",
          description: "Please log in to access this resource.",
        });
      }
    }

    switch (status) {
      // case 401: {
      //   if (api.getState().auth.user) {
      //     removeUserAndToken();
      //     api.dispatch(removeAuth());
      //     notification.error({
      //       message: "Unauthorized or session expired.",
      //       description: "Please log in to access this resource.",
      //     });
      //   }
      //   break;
      // }
      case "FETCH_ERROR": {
        notification.error({
          message: "Error",
          description: "Something went wrong. Please try again later.",
        });
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

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBase: builder.query({
      query: ({url ="", params={}}) => ({
        url: url,
        method: "GET",
        params: params,
      }),
    }),
  }),
});

export const { useGetBaseQuery, usePrefetch } = baseApi;
