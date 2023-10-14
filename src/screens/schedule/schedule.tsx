import React, { useEffect, useState } from "react";
import ComponentWithHeader from "../../common/componentWithHeader";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import {
  useLazyCheckNullRatesExsistsQuery,
  useLazyUseGetDepriciationItDataQuery,
} from "../../redux/api/depreciationItApiSlice";
import { Button, LinearProgress } from "@mui/material";
import DepreciationItDataTable from "../../components/schedule/depreciationItData";
import { notifyFailure } from "../../common/notify";
import { NavLink, Navigate } from "react-router-dom";

function Schedule() {
  const [year, setYear] = React.useState<Dayjs | null>(null);
  const [showNullErrorMessage, setShowNullErrorMessage] =
    useState<boolean>(false);
  const [
    getDepData,
    {
      isLoading: generatingData,
      isError: generateDepDataError,
      data: depDataIt,
    },
  ] = useLazyUseGetDepriciationItDataQuery();
  const [checkNullRates, { isLoading: checkringNullRates }] =
    useLazyCheckNullRatesExsistsQuery();

  async function generateDepData() {
    try {
      const getNullRecords = await checkNullRates(
        year!.toDate().getFullYear()
      ).unwrap();
      if (getNullRecords.length > 0) {
        setShowNullErrorMessage(true);
        return;
      }
      setShowNullErrorMessage(false);
      await getDepData(year!.toDate().getFullYear()).unwrap();
    } catch (e) {
      notifyFailure("Could not generate data.Please try again");
    }
  }

  return (
    <ComponentWithHeader title="Schedule">
      {(generatingData || checkringNullRates) && <LinearProgress />}

      <h6 className="  text-gray-600">
        Please select a year upto which you want to calculate depreciation
      </h6>
      <div className="mt-2 flex gap-3 md:flex-row flex-col items-center mb-4">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={"Year"}
            value={year}
            sx={{ width: "100%" }}
            views={["year"]}
            onChange={(value) => {
              setYear(value);
            }}
            slotProps={{ textField: { size: "small" } }}
            maxDate={dayjs(new Date())}
          />
        </LocalizationProvider>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#5F41E6" }}
          onClick={generateDepData}
          disabled={generatingData || !Boolean(year) || checkringNullRates}
        >
          Generate
        </Button>
      </div>
      {showNullErrorMessage && (
        <p className=" text-sm text-red-500 mb-4">
          Please fill all the depreciation rates upto selected year for all
          product Types{" "}
          <NavLink
            to={"/productTypes"}
            className="border-b-2 border-blue-500 text-blue-500 "
          >
            here
          </NavLink>
        </p>
      )}
      {depDataIt && depDataIt.length == 0 && !showNullErrorMessage &&(
        <div className="text-red-500 text-sm tracking-wider">
          There are no products in till this year.Please add a product{" "}
          <NavLink
            to={"/addProducts"}
            className="border-b-2 border-blue-500 text-blue-500 "
          >
            here
          </NavLink>
        </div>
      )}
      {depDataIt && (
        <DepreciationItDataTable
          data={depDataIt!}
          year={year?.toDate().getFullYear()!}
        />
      )}
    </ComponentWithHeader>
  );
}

export default Schedule;
