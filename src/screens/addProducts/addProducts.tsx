import { Button, useMediaQuery } from "@mui/material";

import InvoiceDetails from "../../components/addProducts/invoiceDetails";
import CompanyDetails from "../../components/addProducts/companyDetails";
import ProductDetails from "../../components/addProducts/productDetails";
import ComponentWithHeader from "../../common/componentWithHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import { AddProductValues } from "../../models/addProcductValues";

const schema = Yup.object({
  invoiceDetails: Yup.object({
    number: Yup.string().trim().required("Please enter Invoice number"),
    date: Yup.date().required("Please select invoice date"),
  }),
  supplierDetails: Yup.object({
    name: Yup.string().trim().required("Please enter name"),
    address: Yup.string().trim().required("Please enter address"),
  }),
  productDetails: Yup.object({
    name: Yup.string().trim().required("Please enter product name"),
    date: Yup.date().required("Please select purchase date"),
    quantity: Yup.string().trim().required("Please enter quantity"),
    price: Yup.string().trim().required("Please enter price"),
    cgst: Yup.string().trim().required("Please enter cgst"),
    sgst: Yup.string().trim().required("Please enter sgst"),
  }),
});

function AddProducts() {
  const initialValues: AddProductValues = {
    invoiceDetails: {
      number: "",
      date: null,
    },
    supplierDetails: {
      name: "",
      address: "",
    },
    productDetails: {
      name: "",
      date: null,
      quantity: "",
      price: "",
      cgst: "",
      sgst: "",
    },
  };
  return (
    <ComponentWithHeader title="Add Product">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          console.log(values);
        }}
      >
        {(formikProps) => (
          <div>
            <div className=" grid md:grid-cols-2 grid-cols-1 grid-rows-[auto_auto] gap-8 items-start bg-white p-5 rounded-lg shadow-lg ">
              <InvoiceDetails formikProps={formikProps} />
              <CompanyDetails formikProps={formikProps} />
              <ProductDetails formikProps={formikProps} />
            </div>
            <Button
              variant="contained"
              sx={{
                
                backgroundColor: "#6A00F4",
                marginTop: 2,
                marginLeft  : "auto",
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
          </div>
        )}
      </Formik>
    </ComponentWithHeader>
  );
}

export default AddProducts;
