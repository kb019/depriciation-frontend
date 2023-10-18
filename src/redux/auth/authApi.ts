import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setUserTokens } from "./authSlice";
import { RootState } from "../store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { BaseUrl } from "../../constants/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: BaseUrl,

  credentials: "same-origin",
  prepareHeaders: (headers, { getState, endpoint }) => {
    const acessToken = (getState() as RootState).auth.userTokens?.accessToken;
    const refreshToken = (getState() as RootState).auth.userTokens
      ?.refreshToken;
    if (acessToken && endpoint != "refresh") {
      headers.set("Authorization", `Bearer ${acessToken}`);
    } else if (refreshToken && endpoint == "refresh") {
      headers.set("Authorization", `Bearer ${refreshToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log("result is ", result);
  if (result?.error?.status === 403 || result?.error?.status === 401) {
    console.log("sending refresh token");
    //send refresh token to get new acees token
    const refreshResult = await baseQuery(
      {
        url: "/api/v1/auth/refresh",
        method: "GET",
        // body: {
        //   refreshToken: (api.getState() as RootState).auth.userTokens
        //     ?.refreshToken,
        // },
      },
      { ...api, endpoint: "refresh" },
      extraOptions
    );
    console.log("refresh result is", refreshResult);
    if (refreshResult.data) {
      //store new token
      api.dispatch(
        setUserTokens({
          accessToken: (refreshResult.data as any).accessToken,
          refreshToken: (refreshResult.data as any).refreshToken,
        })
      );
      //retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "app",
  baseQuery: baseQueryWithReauth,
  endpoints: (_) => ({}),
});
