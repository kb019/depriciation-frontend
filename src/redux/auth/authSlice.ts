import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
import { AuthState, UserInfo } from "../../models/authState";

const userTokens = localStorage.getItem("userTokens")
  ? JSON.parse(localStorage.getItem("userTokens")!)
  : null;

const initialState: AuthState = {
  loading: false,
  userInfo: null, // for user object
  userTokens, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.userTokens = null;
      localStorage.clear();
    },
    setUserTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      const accessToken = action.payload.accessToken!;
      const refreshToken = action.payload.refreshToken!;
      const newTokens = {
        accessToken,
        refreshToken,
      };
      state.userTokens = newTokens;
      localStorage.setItem("userTokens", JSON.stringify(state.userTokens));
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = { ...action.payload };
    },
  },

  extraReducers: (builders) => {
    builders
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          state.loading = false;
          // state.userInfo = payload.userInfo;
          // console.log("payload is", payload);
          state.userTokens = payload.userTokens;
        }
      )
      .addCase(userLogin.rejected, (state, { payload }: PayloadAction<any>) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default authSlice.reducer;

export const { logout, setUserTokens, setUserInfo } = authSlice.actions;
