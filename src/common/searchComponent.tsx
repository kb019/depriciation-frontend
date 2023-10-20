import  { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { SearchProps } from "../models/searchProps";


function Search(props: SearchProps) {
  const { triggerFunction,placeHolder, ...restProps } = props;
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      triggerFunction(searchValue);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);
  return (
    <div className="flex items-center  w-full gap-4 p-3 bg-white mb-2 rounded-lg shadow-md">
      <div className="flex items-center flex-1 gap-2 bg-gray-100 p-2 rounded-lg">
        <SearchIcon sx={{ color: "#838080" }} />
        <div className=" w-[100%]">
          <input
            type="text"
            value={searchValue}
            placeholder={placeHolder}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            {...restProps}
            style={{ width: "100%", outline: "none", border: "none" }}
          />
        </div>
      </div>
      <div
      className={`${searchValue.length>0?"opacity-100 rotate-180":"opacity-0 pointer-events-none rotate-0"} transition-all duration-300`}
        onClick={() => {
          setSearchValue("");
        }}
      >
        <CloseIcon sx={{ color: "#838080" }} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default Search;
