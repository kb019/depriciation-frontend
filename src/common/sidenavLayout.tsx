import { Children } from "../models/children";
import TodayIcon from "@mui/icons-material/Today";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import { NavBarItem } from "../models/navbarItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink } from "react-router-dom";
import { LinearProgress } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LanIcon from "@mui/icons-material/Lan";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const menuItems = [
  { name: "Schedule", icon: TodayIcon, path: "/schedule" },
  { name: "Categories", icon: CategoryIcon, path: "/categories" },
  {
    name: "Product Types",
    icon: LanIcon,
    path: "/productTypes",
    subItems: [
      {
        name: "List",
        //icon does not matter here but doing for typescript
        icon: TrendingUpIcon,
        path: "/productTypes/list",
      },
      {
        name: "IT Rates",
        //icon does not matter here but doing for typescript
        icon: TrendingUpIcon,
        path: "/productTypes/fillRates",
      },
    ],
  },
  { name: "Add Products", icon: AddCircleIcon, path: "/addProducts" },
  {
    name: "Products",
    icon: WidgetsIcon,
    path: "/products",
    subItems: [
      {
        name: "List",
        //icon does not matter here but doing for typescript
        icon: TrendingUpIcon,
        path: "/products/list",
      },
      {
        name: "Item Details",
        //icon does not matter here but doing for typescript
        icon: TrendingUpIcon,
        path: "/products/info",
      },
    ],
  },
];

function NavItem(
  ele: NavBarItem,
  isOpen: boolean,
  isActive: boolean,
  isSubItem: boolean = false
) {
  const className = isOpen ? "options-visible" : "options-invisible";
  const Icon = ele.icon;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="flex gap-2 items-center">
        <div
          className={`flex items-center gap-2  flex-1  px-3 py-[6px] hover:scale-110 rounded-full  hover:cursor-pointer ${
            isActive && !isSubItem
              ? " bg-navitemBg bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl text-white"
              : !isSubItem && "hover:bg-gray-200"
          }`}
          onClick={(e) => {
            // e.stopPropagation();
            // e.preventDefault();
            setOpen((prev) => !prev);
          }}
        >
          {!isSubItem && (
            <div>
              <Icon
                sx={{
                  fontSize: "25px",
                  color: `${isActive ? "white" : "gray"}`,
                }}
              />
            </div>
          )}
          {isOpen && (
            <div className={`${className} whitespace-nowrap overflow-hidden`}>
              {ele.name}
            </div>
          )}
          {ele.subItems && ele.subItems.length > 0 && isOpen && (
            <div className="ml-auto">
              {!open ? <ChevronRightIcon /> : <ExpandMoreIcon />}
            </div>
          )}
        </div>
      </div>
      {open && isOpen && (
        <div className="ml-7 mt-2">
          {ele.subItems?.map((subItem) => {
            return (
              <NavLink to={`${subItem.path}`}>
                {({ isActive }) => {
                  return (
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 ${
                          isActive ? "bg-navitemBg" : "bg-white"
                        } rounded-full`}
                      ></div>

                      {NavItem(subItem, isOpen, isActive, true)}
                    </div>
                  );
                }}
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
}

function SidenavLayout({ children }: Children) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const className = isOpen ? "open-nav" : "close-nav";
  return (
    <div className="flex h-full w-full">
      {/* Side nav Starts */}
      <div
        className={`h-full bg-white relative pt-20 p-4 shadow-xl  ${className} sm:flex flex-col gap-6 hidden`}
      >
        <div
          className=" w-max p-2 z-50 flex justify-center items-center rounded-full absolute right-0 top-5 translate-x-[50%] hover:cursor-pointer bg-white shadow-md"
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

        {menuItems.map((ele: NavBarItem, i) => {
          return (
            <NavLink to={`${ele.path}`} key={i}>
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
        className="flex-1 h-full bg-slate-100 relative  overflow-y-auto"
        style={{ boxShadow: "inset 10px 0 10px 0 #ececec" }}
      >
        {children}
      </div>
      {/* Content Ends */}
    </div>
  );
}

export default SidenavLayout;
