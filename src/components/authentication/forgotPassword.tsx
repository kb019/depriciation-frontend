import {
  Box,
 
  LinearProgress,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import * as Yup from "yup";
import { useFormik } from "formik";
import Password from "../../common/password";
import toast from "react-hot-toast";
import { notifyFailure } from "../../common/notify";
import Mask from "../../common/mask";
import { useForgotPasswordMutation } from "../../redux/api/userApiSlice";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter correct email"),
  password: Yup.string()
    .trim()
    .required("Password is Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .trim()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Your passwords do not match."),
});
function ForgotPassword({
  showForgotPassword,
}: {
  showForgotPassword: () => void;
}) {
  const [forgotPassword, { isLoading: changingPassword }] =
    useForgotPasswordMutation();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);

      try {
        toast.promise(forgotPassword(values).unwrap(), {
          loading: "Changing Password",
          success: () => {
            formik.resetForm();
            showForgotPassword();
            return "Changed Password Successfully";
          },
          error: (e) =>
            e?.data?.message || "Not able to change password,Please try again.",
        });
      } catch (e: any) {
        notifyFailure(
          e?.data?.message || "Not able to change password,Please try again"
        );
      }
    },
  });
  return (
    <>
      {changingPassword && <LinearProgress />}
      {changingPassword && <Mask />}
      <div className="p-5  h-max">
        <div className=" flex flex-col gap-4 ">
          <h1 className="font-bold text-gray-700 md:text-4xl  text-2xl text-center mb-4 border-b-2">
            DEPRECIATOR
          </h1>
          <h2 className="font-bold text-gray-500 md:text-2xl text-xl">
            {" "}
            Forgot Password
          </h2>

          <Box
            sx={{
              display: "flex",
              alignItems: Boolean(formik.errors.email) ? "center" : "flex-end",
            }}
          >
            <EmailIcon sx={{ color: "#B8B8DA", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Email"
              name="email"
              onChange={formik.handleChange}
              variant="standard"
              InputLabelProps={{
                style: { fontWeight: "bold", color: "#B8B8DA" },
              }}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Box>

          <Password
            label="Password"
            name="password"
            value={formik.values.password}
            formik={formik as any}
            error={
              formik.touched.password ? Boolean(formik.errors.password) : false
            }
            helperText={formik.touched.password ? formik.errors.password! : ""}
          />
          <Password
            label="Confirm Password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            formik={formik as any}
            error={
              formik.touched.confirmPassword
                ? Boolean(formik.errors.confirmPassword)
                : false
            }
            helperText={
              formik.touched.confirmPassword
                ? formik.errors.confirmPassword!
                : ""
            }
          />
        </div>

        <button
          className="font-semibold bg-[#6C63FF] p-2 mt-10 rounded-2xl text-white shadow-lg text-sm px-7 hover:bg-[#8b85fc]"
          onClick={() => {
            formik.handleSubmit();
          }}
          type="submit"
        >
          Change Password
        </button>

        <p className="mt-7 font-semibold text-sm text-[#7373A4]">
          Go To
          <a
            className="text-[#8887F6] cursor-pointer ml-2"
            onClick={showForgotPassword}
          >
            Log In
          </a>
        </p>
      </div>
    </>
  );
}

export default ForgotPassword;
