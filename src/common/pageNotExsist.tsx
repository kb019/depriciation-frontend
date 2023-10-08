import React from "react";
import ComponentWithHeader from "./componentWithHeader";
import pagenotfound from "../assets/images/404page.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function PageNotExist() {
  const navigate = useNavigate();
  return (
    <ComponentWithHeader title="">
      <div className="h-full w-full flex items-center justify-center flex-col">
        <img
          src={pagenotfound}
          alt="page not found image"
          className="object-contain h-96 w-96"
        />
        <Button
          variant="contained"
          sx={{ bgcolor: "#6A00F4" }}
          onClick={() => {
            navigate("/");
          }}
        >
          {" "}
          Go Home
        </Button>
      </div>
    </ComponentWithHeader>
  );
}

export default PageNotExist;
