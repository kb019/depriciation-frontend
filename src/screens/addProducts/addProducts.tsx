import { Button, Stack, useMediaQuery } from "@mui/material";

import InvoiceDetails from "../../components/addProducts/invoiceDetails";
import CompanyDetails from "../../components/addProducts/companyDetails";
import ProductDetails from "../../components/addProducts/productDetails";
import ComponentWithHeader from "../../common/componentWithHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AddUpdateProductDetail,
  ProductDetails as ProductDetailsType,
} from "../../models/product";
import {
  useAddNewProductMutation,
  useLazyGetProductByIdQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApiSlice";
import { notifyFailure, notifySuccess } from "../../common/notify";
import CategoryName from "../../components/addProducts/categoryName";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../common/loader";

const buttonCss = {
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
};
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
  //as soon as i get product id,i want to set loader and hence using separate loader state
  const [loading, setLoading] = useState<boolean>(!!state?.productId);
  const [getProductById, { data: itemData, isLoading: itemLoading }] =
    useLazyGetProductByIdQuery();
  const [updateProductById, { isLoading: updatingProduct }] =
    useUpdateProductMutation();
  const [
    addNewProduct,
    // { isLoading: addingProduct, isError: addProductError },
  ] = useAddNewProductMutation();
  const navigate = useNavigate();
  const initialValues: ProductDetailsType = {
    categoryInputValue: "",
    categoryDetails: {
      categoryName:
        state?.categoryName ||
        (state?.productId && itemData?.category.name) ||
        "",
      categoryId:
        state?.categoryId || (state?.productId && itemData?.category.id) || "",
    },
    invoiceDetails: {
      invoiceNumber: (state?.productId && itemData?.invoiceNumber) || "",
      invoiceDate: (state?.productId && itemData?.invoiceDate) || null,
    },
    supplierDetails: {
      supplierName: (state?.productId && itemData?.supplierName) || "",
      supplierAddress: (state?.productId && itemData?.supplierAddress) || "",
    },
    productDetails: {
      productName: (state?.productId && itemData?.productName) || "",
      purchaseDate: (state?.productId && itemData?.purchaseDate) || null,
      quantity:
        state?.productId && itemData?.quantity
          ? Number(itemData?.quantity)
          : null,
      price:
        state?.productId && itemData?.price ? Number(itemData?.price) : null,
      cgst: state?.productId && itemData?.cgst ? Number(itemData.cgst) : null,
      sgst: state?.productId && itemData?.sgst ? Number(itemData?.sgst) : null,
    },
  };

  async function updateProduct(
    productId: string,
    itemDetails: ProductDetailsType
  ) {
    try {
      const body: AddUpdateProductDetail = {
        supplierDetails: {
          ...itemDetails.supplierDetails,
        },
        invoiceDetails: {
          ...itemDetails.invoiceDetails,
        },
        productDetails: {
          ...itemDetails.productDetails,
        },
        categoryId: itemDetails.categoryDetails?.categoryId,
      };

      await updateProductById({ productId, itemDetails: body }).unwrap();
      notifySuccess("Product updated successfully");
      await getProductDetail();
      setTimeout(() => {
        navigate("/products");
      }, 1000);
    } catch (e) {
      notifyFailure("There was some issue updating product,please try again");
    }
  }

  async function getProductDetail() {
    try {
      //loadind is set to true initially
      // setLoading(true);
      await getProductById({ productId: state?.productId }).unwrap();
      setLoading(false);
    } catch (e) {
      notifyFailure("There seems some issue,Please try again");
      setLoading(false);
    }
  }
  useEffect(() => {
    if (state?.productId) {
      getProductDetail();
    }
  }, []);

  if (loading || updatingProduct) return <Loader />;

  return (
    <ComponentWithHeader
      title={`${state?.productId ? "Edit Product" : "Add Product"}`}
      key={`${state?.productId ? "Edit Product" : "Add Product"}`}
    >
      <Formik
        enableReinitialize={true}
        initialValues={{ ...initialValues }}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const body: AddUpdateProductDetail = {
              supplierDetails: {
                ...values.supplierDetails,
              },
              invoiceDetails: {
                ...values.invoiceDetails,
              },
              productDetails: {
                ...values.productDetails,
              },
              categoryId: values.categoryDetails?.categoryId,
            };
            await addNewProduct(body).unwrap();
            notifySuccess("Product added successfully");
            setSubmitting(false);

            resetForm({
              values: {
                ...initialValues,
                categoryDetails: {
                  categoryName: "",
                  categoryId: "",
                },
              },
            });
          } catch (e) {
            notifyFailure(
              "There was a problem adding product, please try again"
            );
            setLoading(false);

            setSubmitting(false);
          }
        }}
      >
        {(formikProps) => (
          <div className="mt-2">
            <div className=" grid md:grid-cols-2 grid-cols-1 grid-rows-[auto_auto] gap-8 items-start bg-white p-5 rounded-lg shadow-lg ">
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
              {!state?.productId && (
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
              )}
              {state?.productId ? (
                <Button
                  variant="contained"
                  disabled={formikProps.isSubmitting || !formikProps.dirty}
                  sx={buttonCss}
                  onClick={() => {
                    updateProduct(state?.productId, formikProps.values);
                  }}
                >
                  Update Product
                </Button>
              ) : (
                <Button
                  variant="contained"
                  disabled={formikProps.isSubmitting}
                  sx={buttonCss}
                  onClick={() => {
                    formikProps.handleSubmit();
                  }}
                >
                  Add Product
                </Button>
              )}
            </Stack>
          </div>
        )}
      </Formik>
    </ComponentWithHeader>
  );
}

export default AddProducts;
