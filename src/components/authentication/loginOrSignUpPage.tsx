import  { useState } from "react";
import SignUp from "./signUp";
import SignUpOrLoginLogo from "./signUpOrLoginLogo";
import LogIn from "./logIn";

function LoginOrSignUpPage() {
  const [showLoginPage, setShowLogin] = useState<boolean>(true);
  return (
    <div className="flex md:items-center md:flex-row flex-col">
      <div className="inserted-svg-logo flex-1 md:block hidden">
        <SignUpOrLoginLogo />
      </div>
      <div
        className="flex-1 md:m-auto m-0 overflow-y-auto"
        style={{ maxHeight: "100dvh" }}
      >
        {showLoginPage ? (
          <LogIn
            changePage={() => {
              setShowLogin(false);
            }}
          />
        ) : (
          <SignUp
            changePage={() => {
              setShowLogin(true);
            }}
          />
        )}
      </div>
    </div>
  );
}

export default LoginOrSignUpPage;
