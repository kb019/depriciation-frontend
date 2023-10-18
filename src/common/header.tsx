import DepriciationOutlinePurple from "../assets/images/depreciation_logo_outline_purple.png";
import { useAppSelector } from "../hooks/reduxHooks";

function Header() {
  const companyName = useAppSelector(
    (state) => state.auth.userInfo?.companyName
  );
  return (
    <div className="w-full">
      {/* flex container */}
      <div className="flex justify-center items-center  p-2">
        <div className=" self-start ml-5">
          <img src={DepriciationOutlinePurple} className="w-10 h-10" />
        </div>
        <div className="flex-1 text-center">
          <p className="font-medium text-lg  text-white">{companyName?.toUpperCase()}</p>
        </div>
      </div>
      {/* flex container end */}
    </div>
  );
}

export default Header;
