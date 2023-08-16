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
         options={categoryData || []}
          getOptionLabel={(option) => option.name}
          value={{
            id: values.categoryDetails.categoryId,
            //created_at and updated_at can be set to any arbitrary value,it does not matter
            created_at: "2023-08-16T18:05:45.932Z",
            updated_at: "2023-08-16T18:05:45.932Z",
            name: values.categoryDetails.categoryName,
          }}
          onChange={(event, value) => {
            setFieldValue("categoryDetails.categoryName", value?.name);
            setFieldValue("categoryDetails.categoryId", value?.id);
          }}
          sx={{ width: "100%" }}
          
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
