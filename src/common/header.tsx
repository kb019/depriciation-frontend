import { useState } from "react";
import DepriciationOutlinePurple from "../assets/images/depreciation_logo_outline_purple.png";
import { useAppSelector } from "../hooks/reduxHooks";
import { SideNav } from "./sidenavLayout";
import CancelIcon from "@mui/icons-material/Cancel";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const companyName = useAppSelector(
    (state) => state.auth.userInfo?.companyName
  );

  const [openSideNav, setOpenSideNav] = useState<boolean>(false);
  const sideNavDivClassNames = openSideNav
    ? "translate-x-0"
    : "translate-x-[-100%]";
  return (
    <div className="w-full relative ">
      {
        <div
          className={`absolute top-0 left-0 z-50 sm:hidden flex w-full bg-gray-500/40 transition-all duration-300 ${sideNavDivClassNames}`}
          style={{ height: "100dvh" }}
          onClick={(e) => {
            const closestParent = (e?.target as HTMLDivElement)?.closest(
              ".navItem"
            );
            if (closestParent != null) setOpenSideNav(false);
          }}
        >
          <SideNav />
          <div
            className="text-white h-max"
            onClick={() => {
              setOpenSideNav(false);
            }}
          >
            <CancelIcon />
          </div>
        </div>
      }
      {/* flex container */}

      <div className="flex justify-center items-center  p-2">
        <div className=" self-start ml-5 text-white">
          <img
            src={DepriciationOutlinePurple}
            className="w-10 h-10 sm:inline hidden"
          />
          <span
            className="sm:hidden inline"
            onClick={() => {
              setOpenSideNav(true);
            }}
          >
            <MenuIcon />
          </span>
        </div>
        <div className="flex-1 text-center">
          <p className="font-medium md:text-lg sm:text-base text-xs text-white">
            {companyName?.toUpperCase()}
          </p>
        </div>
      </div>
      {/* flex container end */}
    </div>
  );
}

export default Header;
