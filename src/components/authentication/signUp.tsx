import {
  Box,
  LinearProgress,
  TextField,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import * as Yup from "yup";
import { useFormik } from "formik";
import Password from "../../common/password";
import { useSignUpMutation } from "../../redux/api/userApiSlice";
import { notifyFailure } from "../../common/notify";
import Mask from "../../common/mask";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  companyName: Yup.string().trim().required("Company Name is required"),
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter correct email"),
  address: Yup.string().trim().required("Address is required"),
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
function SignUp({ changePage }: { changePage: () => void }) {
  const initialValues = {
    companyName: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
  };
  const [signUp, { isLoading: registeringUser, isError: _registerUserError }] =
    useSignUpMutation();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);
      try {
        toast.promise(signUp(values).unwrap(), {
          loading: "Registering User",
          success: () => {
            formik.resetForm();
            changePage();
            return "Registered User Successfully";
          },
          error: (e) =>
            e?.data?.message || "Not able to register,Please try again",
        });
      } catch (e: any) {
        notifyFailure(
          e?.data?.message || "Not able to register,Please try again"
        );
      }
    },
  });
  return (
    <>
      {registeringUser && <LinearProgress />}
      {registeringUser && <Mask />}
      <div className="p-5  h-max">
        <div className=" flex flex-col gap-4 ">
          <h1 className="font-bold text-gray-700 md:text-4xl  text-2xl text-center mb-4 border-b-2">
            DEPRECIATOR
          </h1>
          <h2 className="font-bold text-gray-500 md:text-2xl text-xl">
            {" "}
            Sign Up
          </h2>
          <Box
            sx={{
              display: "flex",
              alignItems: Boolean(formik.errors.companyName)
                ? "center"
                : "flex-end",
            }}
          >
            <BusinessIcon sx={{ color: "#B8B8DA", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Company Name"
              name="companyName"
              variant="standard"
              onChange={formik.handleChange}
              fullWidth
              value={formik.values.companyName}
              InputLabelProps={{
                style: { fontWeight: "bold", color: "#B8B8DA" },
              }}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
          </Box>
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
              value={formik.values.email}
              onChange={formik.handleChange}
              variant="standard"
              InputLabelProps={{
                style: { fontWeight: "bold", color: "#B8B8DA" },
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: Boolean(formik.errors.address)
                ? "center"
                : "flex-end",
            }}
          >
            <HomeIcon sx={{ color: "#B8B8DA", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Address"
              variant="standard"
              name="address"
              value={formik.values.address}
              multiline
              onChange={formik.handleChange}
              InputLabelProps={{
                style: { fontWeight: "bold", color: "#B8B8DA" },
              }}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              fullWidth
            />
          </Box>
          <Password
            label="Password"
            name="password"
            formik={formik}
            value={formik.values.password}
            error={
              formik.touched.password ? Boolean(formik.errors.password) : false
            }
            helperText={formik.touched.password ? formik.errors.password! : ""}
          />
          <Password
            label="Confirm Password"
            name="confirmPassword"
            formik={formik}
            value={formik.values.confirmPassword}
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
          Get Started Now
        </button>

        <p className="mt-7 font-semibold text-sm text-[#7373A4]">
          Exsiting User?{" "}
          <a className="text-[#8887F6] cursor-pointer" onClick={changePage}>
            Log in
          </a>
        </p>
      </div>
    </>
  );
}

export default SignUp;
