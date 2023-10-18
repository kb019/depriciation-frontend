import { SignUpValues } from "../../models/signUpValues";
import { Tokens } from "../../models/tokens";
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
  }),
});

export const { useSignUpMutation } = userApiSlice;
