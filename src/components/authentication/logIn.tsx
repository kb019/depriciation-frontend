import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import * as Yup from "yup";
import { useFormik } from "formik";
import Password from "../../common/password";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter correct email"),

  password: Yup.string().trim().required("Password is Required"),
});
function LogIn({ changePage }: { changePage: () => void }) {
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="p-5  h-max">
      <div className=" flex flex-col gap-4 ">
        <h1 className="font-bold text-gray-700 md:text-4xl  text-2xl text-center mb-4 border-b-2">
          DEPRECIATOR
        </h1>
        <h2 className="font-bold text-gray-500 md:text-2xl text-xl"> Log In</h2>
        {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <BusinessIcon sx={{ color: "#B8B8DA", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Company Name"
            name="companyName"
            variant="standard"
            onChange={formik.handleChange}
            fullWidth
            InputLabelProps={{
              style: { fontWeight: "bold", color: "#B8B8DA" },
            }}
            error={
              formik.touched.companyName && Boolean(formik.errors.companyName)
            }
            helperText={formik.touched.companyName && formik.errors.companyName}
          />
        </Box> */}
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
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            fullWidth
          />
        </Box>
        {/* <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <HomeIcon sx={{ color: "#B8B8DA", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label="Address"
            variant="standard"
            name="address"
            onChange={formik.handleChange}
            InputLabelProps={{
              style: { fontWeight: "bold", color: "#B8B8DA" },
            }}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
            fullWidth
          />
        </Box> */}
        <Password
          label="Password"
          name="password"
          formik={formik}
          error={
            formik.touched.password ? Boolean(formik.errors.password) : false
          }
          helperText={formik.touched.password ? formik.errors.password! : ""}
        />
        {/* <Password
          label="Confirm Password"
          name="confirmPassword"
          formik={formik}
          error={
            formik.touched.confirmPassword
              ? Boolean(formik.errors.confirmPassword)
              : false
          }
          helperText={
            formik.touched.confirmPassword ? formik.errors.confirmPassword! : ""
          }
        /> */}
      </div>
      <button
        className="font-semibold bg-[#6C63FF] p-2 mt-10 rounded-2xl text-white shadow-lg text-sm px-7 hover:bg-[#8b85fc]"
        onClick={() => {
          formik.handleSubmit();
        }}
        type="submit"
      >
        Submit
      </button>

      <p className="mt-7 font-semibold text-sm text-[#7373A4]">
        New User?{" "}
        <a className="text-[#8887F6] cursor-pointer" onClick={changePage}>
          Sign in
        </a>
      </p>
    </div>
  );
}

export default LogIn;
