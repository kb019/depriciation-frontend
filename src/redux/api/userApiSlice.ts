import { SignUpValues } from "../../models/signUpValues";
import { Tokens } from "../../models/tokens";
import { UserDetails } from "../../models/userDetails";
import { apiSlice } from "../auth/authApi";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<Tokens, SignUpValues>({
      query: (signUpInfo) => ({
        url: "api/v1/auth/signup",
        body: signUpInfo,
        method: "POST",
      }),
    }),
    getUserDetails: builder.query<UserDetails, void>({
      query: () => ({
        url: "api/v1/users",
        method: "GET",
      }),
    }),
    forgotPassword: builder.mutation<
      void,
      { email: string; password: string; confirmPassword: string }
    >({
      query: (body) => ({
        url: "api/v1/auth/forgotPassword",
        method: "POST",
        body: {
          email: body.email,
          password: body.password,
        },
      }),
    }),
    updateUser: builder.mutation<
      UserDetails,
      { email: string; companyName: string; address: string }
    >({
      query: (body) => ({
        url: "api/v1/auth/update",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
  useForgotPasswordMutation,
  useUpdateUserMutation
} = userApiSlice;
