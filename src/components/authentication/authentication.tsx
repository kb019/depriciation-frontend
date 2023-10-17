import React, { useState } from "react";
import SignUp from "./signUp";
import { Children } from "../../models/children";
import LoginOrSignUpPage from "./loginOrSignUpPage";

function Authentication({ children }: Children) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return isAuthenticated ? <>{children}</> : <LoginOrSignUpPage />;
}

export default Authentication;
