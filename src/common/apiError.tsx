import React from "react";
import ComponentWithHeader from "./componentWithHeader";
import { Button } from "@mui/material";
import apierror from "../assets/images/error_svg.svg";

function ApiError({ refecthAction }: { refecthAction: () => void }) {
  return (
    <ComponentWithHeader title="">
      <div className="h-full w-full flex items-center justify-center flex-col gap-3">
        <img
          src={apierror}
          alt="page not found image"
          className="object-contain h-96 w-96"
        />
        <div className="font-semibold text-lg text-gray-500">There was error while retreiving data,Please try again.</div>
        <Button
          variant="contained"
          sx={{ bgcolor: "#6A00F4" }}
          onClick={() => {
            refecthAction();
          }}
        >
          {" "}
          Try Again
        </Button>
      </div>
    </ComponentWithHeader>
  );
}

export default ApiError;
