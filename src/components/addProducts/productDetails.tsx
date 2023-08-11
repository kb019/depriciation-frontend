import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { FormikProps } from "formik";
import React from "react";
import { ProductDetails as ProductDetailsType } from "../../models/product";

function ProductDetails({
  formikProps,
}: {
  formikProps: FormikProps<ProductDetailsType>;
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
    <div className="md:col-start-2 col-start-1 col-span-1 row-start-1 row-span-full  self-stretch h-max">
      <h2 className="font-medium">Product Details</h2>
      <div className="border-2 border-gray-300 rounded-md p-4 mt-2">
        <div>
          <TextField
            size="small"
            fullWidth
            id="outlined-controlled"
            label="Product name"
            sx={{
              marginTop: "7px",
            }}
            disabled={isSubmitting}
            name="productDetails.productName"
            value={values.productDetails.productName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.productDetails?.productName &&
              Boolean(errors.productDetails?.productName)
            }
            helperText={
              touched.productDetails?.productName && errors.productDetails?.productName
            }
          />
        </div>
        <div className="flex  gap-2 w-full md:flex-row flex-wrap  flex-col ">
          <div className="flex-1 basis-2/5 w-full mt-3">
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
                        touched.productDetails?.purchaseDate &&
                          errors.productDetails?.purchaseDate
                      ),
                      helperText:
                        touched.productDetails?.purchaseDate &&
                        errors.productDetails?.purchaseDate,
                      disabled: isSubmitting,
                      name: "productDetails.purchaseDate",
                    },
                  }}
                  value={values.productDetails.purchaseDate?dayjs(values.productDetails.purchaseDate):null}
                  onChange={(value) => {
                    setFieldValue(
                      "productDetails.purchaseDate",
                      new Date(value?.toString()!)
                    );
                  }}
                  label="Purchase Date"
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="flex-1 basis-2/5 w-full mt-3">
            <TextField
              size="small"
              fullWidth
              id="outlined-controlled"
              label="Quantity"
              type="number"
              disabled={isSubmitting}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                marginTop: "7px",
              }}
              name="productDetails.quantity"
              value={values.productDetails.quantity||""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.productDetails?.quantity &&
                Boolean(errors.productDetails?.quantity)
              }
              helperText={
                touched.productDetails?.quantity &&
                errors.productDetails?.quantity
              }
            />
          </div>
        </div>
        <div className="mt-3">
          <TextField
            size="small"
            fullWidth
            id="outlined-controlled"
            label="Price (₹)"
            disabled={isSubmitting}
            type="number"
            InputProps={{ inputProps: { min: 0 } }}
            sx={{
              marginTop: "7px",
            }}
            name="productDetails.price"
            value={values.productDetails.price||""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.productDetails?.price &&
              Boolean(errors.productDetails?.price)
            }
            helperText={
              touched.productDetails?.price && errors.productDetails?.price
            }
          />
        </div>
        <div className="flex  gap-2 w-full md:flex-row flex-wrap  flex-col ">
          <div className="flex-1 basis-2/5 w-full mt-3">
            <TextField
              size="small"
              fullWidth
              id="outlined-controlled"
              label="CGST(%)"
              type="number"
              disabled={isSubmitting}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                marginTop: "7px",
              }}
              name="productDetails.cgst"
              value={values.productDetails.cgst||""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.productDetails?.cgst &&
                Boolean(errors.productDetails?.cgst)
              }
              helperText={
                touched.productDetails?.cgst && errors.productDetails?.cgst
              }
            />
          </div>
          <div className="flex-1 basis-2/5 w-full mt-3">
            <TextField
              size="small"
              id="outlined-controlled"
              fullWidth
              label="SGST(%)"
              type="number"
              disabled={isSubmitting}
              InputProps={{ inputProps: { min: 0 } }}
              sx={{
                marginTop: "7px",
              }}
              name="productDetails.sgst"
              value={values.productDetails.sgst||""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touched.productDetails?.sgst &&
                Boolean(errors.productDetails?.sgst)
              }
              helperText={
                touched.productDetails?.sgst && errors.productDetails?.sgst
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
