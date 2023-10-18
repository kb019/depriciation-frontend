import { Tokens } from "./tokens";

export interface AuthState {
  loading: boolean;
  userTokens: null | Tokens;
  userInfo: null | UserInfo;
  success: boolean;
  error: null | string;
}

export interface UserInfo {
  companyName: string;
  address: string;
  email: string;
}
