import { apiSlice } from "../auth/authApi";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<any, string | null>({
      query: (userId) => {
        return {
          url: `/api/v1/user/${userId}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useGetUserByIdQuery,

  useLazyGetUserByIdQuery,
} = usersApiSlice;
