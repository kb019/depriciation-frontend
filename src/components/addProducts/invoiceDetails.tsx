import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { FormikHelpers, FormikProps } from "formik";
import React from "react";
import { AddProductValues } from "../../models/addProcductValues";

function InvoiceDetails({
  formikProps,
}: {
  formikProps: FormikProps<AddProductValues>;
}) {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    isSubmitting,
  } = formikProps;
  console.log("inside");
  return (
    <div className=" h-max">
      <h2 className="font-medium">Invoice Details</h2>
      <div className="flex  gap-2 w-full md:flex-row flex-wrap  flex-col border-2 border-gray-300 rounded-md p-4 mt-2 ">
        <div className="basis-2/5 w-full flex-1">
          <TextField
            size="small"
            id="outlined-controlled"
            label="Invoice Number"
            name="invoiceDetails.number"
            value={values.invoiceDetails.number}
            onBlur={handleBlur}
            fullWidth
            disabled={isSubmitting}
            sx={{
              marginTop: "7px",
            }}
            className="bg-white`"
            onChange={handleChange}
            error={
              touched.invoiceDetails?.number &&
              Boolean(errors.invoiceDetails?.number)
            }
            helperText={
              touched.invoiceDetails?.number && errors.invoiceDetails?.number
            }
          />
        </div>
        <div className="basis-2/5 w-full flex-1 ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                format="DD-MM-YYYY"
                slotProps={{
                  textField: {
                    size: "small",
                    fullWidth: true,
                    onBlur: handleBlur,
                    error: Boolean(
                      touched.invoiceDetails?.date &&
                        errors.invoiceDetails?.date
                    ),
                    helperText:
                      touched.invoiceDetails?.date &&
                      errors.invoiceDetails?.date,
                    disabled: isSubmitting,
                    name: "invoiceDetails.date",
                  },
                }}
                value={
                  values.invoiceDetails.date
                    ? dayjs(values.invoiceDetails.date)
                    : null
                }
                onChange={(value) => {
                  setFieldValue(
                    "invoiceDetails.date",
                    new Date(value?.toString()!)
                  );
                }}
                label="Invoice Date"
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDetails;
