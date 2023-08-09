import { TextField } from "@mui/material";
import { FormikProps } from "formik";
import React from "react";
import { AddProductValues } from "../../models/addProcductValues";

function CompanyDetails({
  formikProps,
}: {
  formikProps: FormikProps<AddProductValues>;
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
            name="supplierDetails.name"
            value={values.supplierDetails.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.supplierDetails?.name &&
              Boolean(errors.supplierDetails?.name)
            }
            helperText={
              touched.supplierDetails?.name && errors.supplierDetails?.name
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
name="supplierDetails.address"
            value={values.supplierDetails.address}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.supplierDetails?.address &&
              Boolean(errors.supplierDetails?.address)
            }
            helperText={
              touched.supplierDetails?.address &&
              errors.supplierDetails?.address
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
