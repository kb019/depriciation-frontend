import React from "react";
import { useGetAllCategoriesWithoutPaginationQuery } from "../../redux/api/categoryApiSlice";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import { Formik } from "formik";
import { WrappedComponentProps } from "../../models/modalHocType";
import {
  useAddNewProductTypeMutation,
  useUpdateProductTypeMutation,
} from "../../redux/api/productTypeApiSlice";
import {
  ApiProductTypeInfo,
  ProductTypeEditInfo,
} from "../../models/productTypeInfo";
import { notifyFailure, notifySuccess } from "../../common/notify";
import * as Yup from "yup";
const buttonCss = {
  backgroundColor: "#6A00F4",
  ":hover": {
    bgcolor: "#6A00F4", // theme.palette.primary.main
    boxShadow: 1,
    transform: "scale(0.9)",
  },
  boxShadow: 1,
};

const validationSchema = Yup.object({
  categoryDetails: Yup.object({
    categoryName: Yup.string().trim().required("Please Select Category Name"),
  }),

  productType: Yup.string().trim().required("Please enter product Type"),
});

function AddEditProduct({ close, triggerAction, data }: WrappedComponentProps) {
  const { data: categoryData, isLoading: categoriesLoading } =
    useGetAllCategoriesWithoutPaginationQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const editProductTypeInfo = data as ProductTypeEditInfo;

  const [updateProductType, { isLoading: updatingProductType }] =
    useUpdateProductTypeMutation();


  const [addProductType, { isLoading: addingProducts }] =
    useAddNewProductTypeMutation();
  const initialValues = {
    categoryInputValue: editProductTypeInfo?.categoryName || "",
    categoryDetails: {
      categoryId: editProductTypeInfo?.categoryId || "",
      categoryName: editProductTypeInfo?.categoryName || "",
    },
    productType: editProductTypeInfo?.productName || "",
  };


 
  return (
    <div className="lg:w-[500px] md:w-[400px] w-64">
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values,{resetForm}) => {
          console.log(values);
          let productTypeInfo: ApiProductTypeInfo = {
            productType: values.productType,
            categoryId: values.categoryDetails.categoryId,
          };
        
          try {
            if(editProductTypeInfo?.productId){
                await updateProductType({productTypeId:editProductTypeInfo.productId,productTypeDetails:productTypeInfo}).unwrap();
                notifySuccess("Updated the product type successfully");
                
            }else{
            await addProductType(productTypeInfo).unwrap();
            notifySuccess("Add the product type successfully");
               resetForm();
            }
            triggerAction();
          } catch (e) {
            notifyFailure("Please try after some time.");
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          dirty,
        }) => (
          <>
            <div className="flex flex-col gap-5">
              <Autocomplete
                // disablePortal
                id="combo-box-demo"
                options={categoryData || []}
                getOptionLabel={(option) => option.name}
             
                onChange={(_, value) => {
                  setFieldValue("categoryDetails.categoryName", value?.name);
                  setFieldValue("categoryDetails.categoryId", value?.id);
                }}
                sx={{ width: "100%" }}
                inputValue={values.categoryInputValue}
                onInputChange={(_, newValue) => {
                  setFieldValue("categoryInputValue", newValue);
                }}
                isOptionEqualToValue={(option,value)=>option.id===value.id}
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
              <TextField
                id="outlined-controlled"
                label="Product Type"
                size="small"
                error={touched.productType && Boolean(errors.productType)}
                helperText={touched.productType && errors.productType}
                value={values.productType}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setFieldValue("productType", event.target.value);
                }}
              />
            </div>
            <Stack
              
              justifyContent={"flex-end"}
              spacing={{ xs: 3, sm: 3, md: 3 }}
              direction={{ sm: "column", md: "row" }}
              className="mt-5"
            >
              <Button
                onClick={() => {
                  close!();
                }}
                variant="outlined"
                disabled={addingProducts || updatingProductType}
                sx={{
                  border: "1px solid #6A00F4",
                  color: "#6A00F4",
                  ":hover": {
                    bgcolor: "white", // theme.palette.primary.main
                    boxShadow: 1,
                    transform: "scale(0.9)",
                    border: "1px solid #6A00F4",
                  },
                  boxShadow: 1,
                }}
              >
                Cancel
              </Button>
              {!editProductTypeInfo?.categoryName ? (
                <Button
                  variant="contained"
                  disabled={addingProducts || !dirty}
                  onClick={() => {
                    handleSubmit();
                  }}
                  sx={buttonCss}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={updatingProductType || !dirty}
                  onClick={() => {
                    handleSubmit();
                  }}
                  sx={buttonCss}
                >
                  Update
                </Button>
              )}
            </Stack>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AddEditProduct;
