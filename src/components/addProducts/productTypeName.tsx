import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { useGetAllCategoriesWithoutPaginationQuery } from "../../redux/api/categoryApiSlice";
import { FormikProps } from "formik";
import { ProductDetails } from "../../models/product";
import { useGetAllProductTypesWithoutPaginationQuery } from "../../redux/api/productTypeApiSlice";

function ProductTypeName({
  formikProps,
}: {
  formikProps: FormikProps<ProductDetails>;
}) {
  const { values, errors, touched, handleBlur, setFieldValue, isSubmitting } =
    formikProps;
  const { data: productTypeData, isLoading: productTypesLoading } =
    useGetAllProductTypesWithoutPaginationQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });
  // console.log(
  //   values.productTypeDetails?.productTypeName,
  //   values.productTypeDetails
  // );
  return (
    <div className=" ">
      <h2 className="font-medium">Select Category</h2>
      <div className="w-full border-2 border-gray-300 rounded-md p-4 mt-2 ">
        <Autocomplete
          id="combo-box-demo"
          options={productTypeData || []}
          loadingText="Loading Values ..."
          
          getOptionLabel={(option) => option.productType}
          value={{
            id: values.productTypeDetails?.productTypeId || "",
            // created_at and updated_at can be set to any arbitrary value,it does not matter
            created_at: "2023-08-16T18:05:45.932Z",
            updated_at: "2023-08-16T18:05:45.932Z",
            productType: values.productTypeDetails?.productTypeName || "",
            depreciationItValues: [],
          }}
          onChange={(event, value) => {
            console.log(value);
            if (value != null) {
              setFieldValue(
                "productTypeDetails.productTypeName",
                value?.productType
              );
              setFieldValue("productTypeDetails.productTypeId", value?.id);
            } else {
              setFieldValue("productTypeDetails.productTypeName", "");
              setFieldValue("productTypeDetails.productTypeId", "");
            }
          }}
          isOptionEqualToValue={(option, value) =>
            option.productType === value.productType
          }
          sx={{ width: "100%" }}
          inputValue={values.productTypeInputValue}
          onInputChange={(e, newValue) => {
            setFieldValue("productTypeInputValue", newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product Type"
              fullWidth
              size="small"
              className="w-full"
              onBlur={handleBlur}
              name="productTypeDetails.productTypeName"
              error={
                touched.productTypeDetails?.productTypeName &&
                Boolean(errors.productTypeDetails?.productTypeName)
              }
              helperText={
                touched.productTypeDetails?.productTypeName &&
                errors.productTypeDetails?.productTypeName
              }
              disabled={isSubmitting}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {productTypesLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

export default ProductTypeName;
