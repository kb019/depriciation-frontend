import ComponentWithHeader from "../../common/componentWithHeader";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { useFormik } from "formik";
import { Button, LinearProgress, TextField } from "@mui/material";
import Mask from "../../common/mask";
import { useUpdateUserMutation } from "../../redux/api/userApiSlice";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { setUserInfo } from "../../redux/auth/authSlice";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().trim().required("Compnay Name cannot be empty"),
  address: Yup.string().trim().required("Address cannot be empty"),
});
function Profile() {
  const compnayInfo = useAppSelector((state) => state.auth.userInfo);
  const dispatch = useAppDispatch();
  const initialValues = {
    email: compnayInfo?.email!,
    companyName: compnayInfo?.companyName!,
    address: compnayInfo?.address!,
  };
  const [updateUser, { isLoading: updatingUser }] = useUpdateUserMutation();
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      toast.promise(updateUser(values).unwrap(), {
        loading: "Updating Profile",
        success: () => {
          formik.resetForm({ values: initialValues });
          dispatch(setUserInfo(values));
          return "Profile updated successfully";
        },
        error: (e) => {
          return typeof e == "string"
            ? e
            : "Not able to update profile,please try again";
        },
      });
    },
  });
  return (
    <>
      {updatingUser && <LinearProgress />}
      {updatingUser && <Mask />}
      <ComponentWithHeader title="Profile">
        <div className="flex flex-col gap-8">
          <TextField
            size="small"
            id="outlined-controlled"
            label="Company Name"
            name="companyName"
            value={formik.values.companyName}
            onBlur={formik.handleBlur}
            fullWidth
            // disabled={isSubmitting}
            sx={{
              marginTop: "7px",
            }}
            className="bg-white`"
            onChange={formik.handleChange}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
          <TextField
            size="small"
            id="outlined-controlled"
            label="Email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            fullWidth
            disabled={true}
            sx={{
              marginTop: "7px",
            }}
            className="bg-white`"
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            size="small"
            id="outlined-controlled"
            label="Address"
            name="address"
            value={formik.values.address}
            onBlur={formik.handleBlur}
            fullWidth
            multiline
            // disabled={isSubmitting}
            sx={{
              marginTop: "7px",
            }}
            className="bg-white`"
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <Button
            disabled={!formik.dirty}
            onClick={() => {
              formik.handleSubmit();
            }}
          >
            Update
          </Button>
        </div>
      </ComponentWithHeader>
    </>
  );
}

export default Profile;
