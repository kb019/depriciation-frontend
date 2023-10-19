import React, { useEffect } from "react";
import { Children } from "../../models/children";
import {
  useGetUserDetailsQuery,
  useLazyGetUserDetailsQuery,
} from "../../redux/api/userApiSlice";
import Loader from "../../common/loader";
import ApiError from "../../common/apiError";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout, setUserInfo, setUserTokens } from "../../redux/auth/authSlice";
import { TryOutlined } from "@mui/icons-material";

function CompanyDetails({ children }: Children) {
  const [
    getUserDetails,
    {
      data: userInfo,
      isLoading: gettingUserInfo,
      isFetching: fetchingUserDetails,

      isError: getUserInfoError,
    },
  ] = useLazyGetUserDetailsQuery();
  const dispatch = useAppDispatch();

  async function getUserInfo() {
    try {

      const user = await getUserDetails().unwrap();
      //means that user was not there
      if (user == null) {
        dispatch(logout());
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!userInfo) return;
    const userDetails = {
      companyName: userInfo.companyName,
      address: userInfo.address,
      email: userInfo.email,
    };
    dispatch(setUserInfo(userDetails));
  }, [userInfo]);
  useEffect(() => {
    getUserInfo();
  }, []);
  if (gettingUserInfo || fetchingUserDetails) return <Loader />;

  if (getUserInfoError)
    return (
      <ApiError
        refecthAction={() => {
          getUserInfo();
        }}
      />
    );

  return <>{userInfo && children}</>;
}

export default CompanyDetails;
