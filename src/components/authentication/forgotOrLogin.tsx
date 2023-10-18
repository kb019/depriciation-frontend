import React, { useState } from "react";
import LogIn from "./logIn";
import ForgotPassword from "./forgotPassword";

function ForgotOrLogin({
  changePage,
  showLoginPage,
}: {
  changePage: () => void;
  showLoginPage: () => void;
}) {
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  return showForgotPassword ? (
    <ForgotPassword
      showForgotPassword={() => {
        setShowForgotPassword(false);
      }}
    />
  ) : (
    <LogIn
      changePage={changePage}
      showForgotPassword={() => {
        setShowForgotPassword(true);
      }}
    />
  );
}

export default ForgotOrLogin;
