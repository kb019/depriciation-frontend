import { Children } from "../models/children";
import TodayIcon from "@mui/icons-material/Today";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import { NavBarItem } from "../models/navbarItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Schedule", icon: TodayIcon, path: "/schedule" },
  { name: "Categories", icon: CategoryIcon, path: "/categories" },
  { name: "Products", icon: WidgetsIcon, path: "/products" },
];

function NavItem(ele: NavBarItem, isOpen: boolean, isActive: boolean) {
  const className = isOpen ? "options-visible" : "options-invisible";
  const Icon = ele.icon;
  return (
    <div
      className={`flex items-center gap-3 mt-5   px-3 py-[6px] hover:scale-110 rounded-full  hover:cursor-pointer ${
        isActive ? "bg-navitemBg shadow-xl text-white" : "hover:bg-gray-200"
      }`}
    >
      <div>
        <Icon
          sx={{ fontSize: "25px", color: `${isActive ? "white" : "gray"}` }}
        />
      </div>
      {<div className={`${className} overflow-hidden`}>{ele.name}</div>}
    </div>
  );
}

function SidenavLayout({ children }: Children) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const className = isOpen ? "open-nav" : "close-nav";
  return (
    <div className="flex h-full w-full">
      {/* Side nav Starts */}
      <div
        className={`h-full bg-white relative pt-20 p-4 shadow-xl  ${className}`}
      >
        <div
          className=" w-max p-2 flex justify-center items-center rounded-full absolute right-0 top-5 translate-x-[50%] hover:cursor-pointer bg-white shadow-md"
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? (
            <ChevronLeftIcon sx={{ color: "#6A00F4" }} />
          ) : (
            <ChevronRightIcon sx={{ color: "#6A00F4" }} />
          )}
        </div>

        {menuItems.map((ele: NavBarItem) => {
          return (
            <NavLink to={`${ele.path}`}>
              {({ isActive }) => {
                return NavItem(ele, isOpen, isActive);
              }}
            </NavLink>
          );
        })}
      </div>
      {/* Side Nav Ends */}
      {/* content starts */}
      <div
        className="flex-1 h-full bg-slate-100 p-9"
        style={{ boxShadow: "inset 10px 0 10px 0 #ececec" }}
      >
        {children}
      </div>
      {/* Content Ends */}
    </div>
  );
}

export default SidenavLayout;
