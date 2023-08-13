import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { useGetAllCategoriesWithoutPaginationQuery } from "../../redux/api/categoryApiSlice";
import { FormikProps } from "formik";
import { ProductDetails } from "../../models/product";

function CategoryName({
  formikProps,
}: {
  formikProps: FormikProps<ProductDetails>;
}) {
  const { values, errors, touched, handleBlur, setFieldValue, isSubmitting } =
    formikProps;
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetAllCategoriesWithoutPaginationQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  return (
    <div className=" ">
      <h2 className="font-medium">Select Category</h2>
      <div className="w-full border-2 border-gray-300 rounded-md p-4 mt-2 ">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          disableClearable
          options={categoryData || []}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => {
            setFieldValue("categoryDetails.categoryName", value?.name);
            setFieldValue("categoryDetails.categoryId", value?.id);
          }}
          sx={{ width: "100%" }}
          inputValue={values.categoryDetails.categoryName}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              fullWidth
              size="small"
              className="w-full"
              onBlur={handleBlur}
              name="categoryDetails.categoryName"
              error={
                touched.categoryDetails?.categoryName &&
                Boolean(errors.categoryDetails?.categoryName)
              }
              helperText={
                touched.categoryDetails?.categoryName &&
                errors.categoryDetails?.categoryName
              }
              disabled={isSubmitting}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {categoriesLoading ? (
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

export default CategoryName;
