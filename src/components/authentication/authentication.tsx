import { Children } from "../../models/children";
import LoginOrSignUpPage from "./loginOrSignUpPage";
import { useAppSelector } from "../../hooks/reduxHooks";

function Authentication({ children }: Children) {
  const userTokens = useAppSelector((state) => state.auth.userTokens);
  return userTokens ? <>{children}</> : <LoginOrSignUpPage />;
}

export default Authentication;
