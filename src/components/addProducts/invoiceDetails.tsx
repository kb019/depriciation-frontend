import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import {  FormikProps } from "formik";
import { ProductDetails } from "../../models/product";

function InvoiceDetails({
  formikProps,
}: {
  formikProps: FormikProps<ProductDetails>;
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
  return (
    <div className=" h-max md:col-start-2 col-start-1 col-span-1 ">
      <h2 className="font-medium">Invoice Details</h2>
      <div className="flex  gap-2 w-full md:flex-row flex-wrap  flex-col border-2 border-gray-300 rounded-md p-4 mt-2 ">
        <div className="basis-2/5 w-full flex-1">
          <TextField
            size="small"
            id="outlined-controlled"
            label="Invoice Number"
            name="invoiceDetails.invoiceNumber"
            value={values.invoiceDetails.invoiceNumber}
            onBlur={handleBlur}
            fullWidth
            disabled={isSubmitting}
            sx={{
              marginTop: "7px",
            }}
            className="bg-white`"
            onChange={handleChange}
            error={
              touched.invoiceDetails?.invoiceNumber &&
              Boolean(errors.invoiceDetails?.invoiceNumber)
            }
            helperText={
              touched.invoiceDetails?.invoiceNumber && errors.invoiceDetails?.invoiceNumber
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
                      touched.invoiceDetails?.invoiceDate &&
                        errors.invoiceDetails?.invoiceDate
                    ),
                    helperText:
                      touched.invoiceDetails?.invoiceDate &&
                      errors.invoiceDetails?.invoiceDate,
                    disabled: isSubmitting,
                    name: "invoiceDetails.invoiceDate",
                  },
                }}
                value={
                  values.invoiceDetails.invoiceDate
                    ? dayjs(values.invoiceDetails.invoiceDate)
                    : null
                }
                onChange={(value) => {
                  setFieldValue(
                    "invoiceDetails.invoiceDate",
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
