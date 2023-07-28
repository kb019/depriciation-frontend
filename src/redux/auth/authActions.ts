import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseUrl } from "../../constants/baseUrl";


const backendURL = BaseUrl;
export const userLogin = createAsyncThunk<
  any,
  { username: string; password: string }
>("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    // configure header's Content-Type as JSON
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `${backendURL}/api/v1/auth/signin`,
      { username, password },
      config
    );
    // store user's token in local storage

    const userTokens = {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    };
    const userInfo = {
      id: data.id,
      userName: data.username,
      roles: data.roles,
    };
    localStorage.setItem("userTokens", JSON.stringify(userTokens));
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    return { userTokens, userInfo };
  } catch (error: any) {
    // return custom error message from API if any
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    } else {
      return rejectWithValue(error.message);
    }
  }
});
