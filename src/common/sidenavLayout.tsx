import { Children } from "../models/children";
import TodayIcon from "@mui/icons-material/Today";
import WidgetsIcon from "@mui/icons-material/Widgets";
import CategoryIcon from "@mui/icons-material/Category";
import { useState } from "react";
import { NavBarItem } from "../models/navbarItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { NavLink,  useNavigate } from "react-router-dom";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LanIcon from "@mui/icons-material/Lan";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useAppDispatch } from "../hooks/reduxHooks";
import { logout } from "../redux/auth/authSlice";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
export const menuItems = [
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
  { name: "Profile", icon: AccountCircleIcon, path: "/profile" },
];

function NavItem({
  ele,
  isOpen,
  isActive,
  isSubItem = false,
}: {
  ele: NavBarItem;
  isOpen: boolean;
  isActive: boolean;
  isSubItem?: boolean;
}) {
  const className = isOpen ? "options-visible" : "options-invisible";
  const Icon = ele.icon;
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="navItem">
        <div
          className={` flex items-center gap-2  flex-1  px-3 py-[6px] hover:scale-110 rounded-full  hover:cursor-pointer ${
            isActive && !isSubItem
              ? " bg-navitemBg bg-gradient-to-r from-indigo-600 to-purple-600 shadow text-white"
              : !isSubItem && "hover:bg-gray-200"
          }`}
          onClick={() => {
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
            <div
              className="ml-auto"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setOpen((prev) => !prev);
              }}
            >
              {/* {!open ? <ChevronRightIcon /> : <ExpandMoreIcon />} */}
              <div
                className={`max-w-max ${
                  !open ? "rotate-0" : "rotate-90"
                } transition-all`}
              >
                <ChevronRightIcon />
              </div>
            </div>
          )}
        </div>
      </div>
      {isOpen && ele.subItems && ele.subItems.length > 0 && (
        <div
          className={`ml-7 mt-2  ${
            open ? "h-14 opacity-100" : "h-0 overflow-hidden opacity-0"
          } transition-all`}
        >
          {ele.subItems?.map((subItem) => {
            return (
              <NavLink
                to={`${subItem.path}`}
                key={subItem.name}
                className={"block"}
              >
                {({ isActive }) => {
                  return (
                    <div className="flex items-center">
                      <div
                        className={`h-2 w-2 ${
                          isActive ? "bg-navitemBg" : "bg-white"
                        } rounded-full`}
                      ></div>

                      {
                        <NavItem
                          ele={subItem}
                          isOpen={isOpen}
                          isActive={isActive}
                          isSubItem={true}
                        />
                      }
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

// function NavIconText({
//   ele,
//   isOpen,
// }: // isActive,
// {
//   ele: NavBarItem;
//   isOpen: boolean;
// }) {
//   const navigate = useNavigate();
//   const match = useMatch(ele.path);
//   return (
//     <div
//       onClick={() => {
//         navigate(ele.path);
//       }}
//     >
//       <NavItem ele={ele} isOpen={isOpen} isActive={!!match} />
//     </div>
//   );
// }
function SidenavLayout({ children }: Children) {
  // const [isOpen, setIsOpen] = useState<boolean>(true);
  // const className = isOpen ? "open-nav" : "close-nav";
  // const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  return (
    <div className="flex h-full w-full ">
      {/* Side nav Starts */}
      <div className="sm:block hidden">
        <SideNav />
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

 export function SideNav() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const className = isOpen ? "open-nav" : "close-nav";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div
      className={`h-full bg-white relative pt-20  shadow-xl  ${className} flex flex-col justify-between `}
    >
      <div
        className="sm:flex hidden w-max p-2 z-50  justify-center items-center rounded-full absolute right-0 top-5 translate-x-[50%] hover:cursor-pointer bg-white shadow-md"
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
      <div className="flex flex-col gap-6 overflow-y-auto p-4 overflow-x-hidden navItems">
        {menuItems.map((ele: NavBarItem) => {
          return (
            <NavLink to={`${ele.path}`} key={ele.path} className={"block"}>
              {({ isActive }) => {
                return (
                  <NavItem ele={ele} isOpen={isOpen} isActive={isActive} />
                );
                // return NavItem(ele, isOpen, isActive);
              }}
            </NavLink>
            // <NavIconText ele={ele} key={ele.path} isOpen={isOpen} />
          );
        })}
      </div>
      <div className="p-4 ">
        <div
          className="flex bg-gray-300 hover:bg-slate-100 items-center p-2 px-3 rounded-md cursor-pointer"
          onClick={() => {
            navigate("/");
            dispatch(logout());
          }}
        >
          <ExitToAppIcon />
          {isOpen && (
            <button className=" mx-auto  w-full   text-center  ">Logout</button>
          )}
        </div>
      </div>
    </div>
  );
}
