import { Button, Stack, useMediaQuery } from "@mui/material";

import InvoiceDetails from "../../components/addProducts/invoiceDetails";
import CompanyDetails from "../../components/addProducts/companyDetails";
import ProductDetails from "../../components/addProducts/productDetails";
import ComponentWithHeader from "../../common/componentWithHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import { ProductDetails as ProductDetailsType } from "../../models/product";
import { useAddNewProductMutation } from "../../redux/api/productApiSlice";
import { notifyFailure, notifySuccess } from "../../common/notify";
import CategoryName from "../../components/addProducts/categoryName";
import { useLocation } from "react-router-dom";

const schema = Yup.object({
  categoryDetails: Yup.object({
    categoryName: Yup.string().trim().required("Please Select Category Name"),
  }),
  invoiceDetails: Yup.object({
    invoiceNumber: Yup.string().trim().required("Please enter Invoice number"),
    invoiceDate: Yup.date().required("Please select invoice date"),
  }),
  supplierDetails: Yup.object({
    supplierName: Yup.string().trim().required("Please enter name"),
    supplierAddress: Yup.string().trim().required("Please enter address"),
  }),
  productDetails: Yup.object({
    productName: Yup.string().trim().required("Please enter product name"),
    purchaseDate: Yup.date().required("Please select purchase date"),
    quantity: Yup.number().required("Please enter quantity"),
    price: Yup.number().required("Please enter price"),
    cgst: Yup.number().required("Please enter cgst"),
    sgst: Yup.number().required("Please enter sgst"),
  }),
});

function AddProducts() {
  const { state } = useLocation();
  const [
    addNewProduct,
    // { isLoading: addingProduct, isError: addProductError },
  ] = useAddNewProductMutation();
  const initialValues: ProductDetailsType = {
    categoryDetails: {
      categoryName: state?.categoryName || "",
      categoryId: state?.categoryId || "",
    },
    invoiceDetails: {
      invoiceNumber: "",
      invoiceDate: null,
    },
    supplierDetails: {
      supplierName: "",
      supplierAddress: "",
    },
    productDetails: {
      productName: "",
      purchaseDate: null,
      quantity: null,
      price: null,
      cgst: null,
      sgst: null,
    },
  };
  return (
    <ComponentWithHeader title="Add Product">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          console.log(values);

          try {
            await addNewProduct(values).unwrap();
            notifySuccess("Product added successfully");
            setSubmitting(false);
            resetForm({ values: initialValues });
          } catch (e) {
            notifyFailure(
              "There was a problem adding product,please try again"
            );

            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <div>
            <div className=" grid md:grid-cols-2 grid-cols-1 grid-rows-[auto_auto] gap-8 items-center bg-white p-5 rounded-lg shadow-lg ">
              <CategoryName formikProps={formikProps} />
              <InvoiceDetails formikProps={formikProps} />
              <CompanyDetails formikProps={formikProps} />
              <ProductDetails formikProps={formikProps} />
            </div>
            <Stack
              justifyContent={"flex-end"}
              direction="row"
              spacing={2}
              className="mt-5"
            >
              <Button
                disabled={formikProps.isSubmitting}
                onClick={() => {
                  formikProps.resetForm({
                    values: {
                      ...initialValues,
                      categoryDetails: {
                        categoryName: "",
                        categoryId: "",
                      },
                    },
                  });
                }}
                variant="outlined"
                sx={{
                  border: "1px solid #6A00F4",
                  color: "#6A00F4",
                  ":hover": {
                    bgcolor: "transperant", // theme.palette.primary.main
                    boxShadow: 1,
                    transform: "scale(0.95)",
                    border: "1px solid #6A00F4",
                  },
                  boxShadow: 1,
                }}
              >
                Reset
              </Button>
              <Button
                variant="contained"
                disabled={formikProps.isSubmitting}
                sx={{
                  backgroundColor: "#6A00F4",
                  marginTop: 2,
                  marginLeft: "auto",
                  display: "block",
                  ":hover": {
                    bgcolor: "#6A00F4", // theme.palette.primary.main
                    boxShadow: 1,
                    transform: "scale(0.95)",
                    border: "1px solid #6A00F4",
                  },
                }}
                onClick={() => {
                  formikProps.handleSubmit();
                }}
              >
                Add Product
              </Button>
            </Stack>
          </div>
        )}
      </Formik>
    </ComponentWithHeader>
  );
}

export default AddProducts;
