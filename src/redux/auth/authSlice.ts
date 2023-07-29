import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";
// import { initialAuthState } from "../../models/authSlice";

const userTokens = localStorage.getItem("userTokens")
  ? JSON.parse(localStorage.getItem("userTokens")!)
  : null;

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo")!)
  : null;

const initialState: any = {
  loading: false,
  userInfo, // for user object
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
    setAccessToken: (state, action: PayloadAction<{ accessToken: string }>) => {
      const accessToken = action.payload.accessToken!;
      const newTokens = {
        accessToken,
        refreshToken: state.userTokens?.refreshToken!,
      };
      state.userTokens = newTokens;
      localStorage.setItem("userTokens", JSON.stringify(state.userTokens));
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
          state.userInfo = payload.userInfo;
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

export const { logout, setAccessToken } = authSlice.actions;
