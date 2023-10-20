import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import { ProductDetails } from "../../models/product";

function CompanyDetails({
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
    isSubmitting,
  } = formikProps;

  return (
    <div>
      <h2 className="font-medium">Company Details</h2>
      <div className="border-2 border-gray-300 rounded-md p-4 mt-2">
        <div>
          <TextField
            size="small"
            label="Supplier Company Name"
            fullWidth
            sx={{
              marginTop: "7px",
            }}
            disabled={isSubmitting}
            name="supplierDetails.supplierName"
            value={values.supplierDetails.supplierName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.supplierDetails?.supplierName &&
              Boolean(errors.supplierDetails?.supplierName)
            }
            helperText={
              touched.supplierDetails?.supplierName && errors.supplierDetails?.supplierName
            }
          />
        </div>
        <div className="mt-5">
          <TextField
            fullWidth
            // placeholder="MultiLine with rows: 2 and rowsMax: 4"
            label="Company Address"
            multiline
            rows={5}
            // maxRows={4}
            disabled={isSubmitting}
name="supplierDetails.supplierAddress"
            value={values.supplierDetails.supplierAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.supplierDetails?.supplierAddress &&
              Boolean(errors.supplierDetails?.supplierAddress)
            }
            helperText={
              touched.supplierDetails?.supplierAddress &&
              errors.supplierDetails?.supplierAddress
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
