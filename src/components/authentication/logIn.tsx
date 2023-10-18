import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Input,
  InputAdornment,
  LinearProgress,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import HomeIcon from "@mui/icons-material/Home";
import * as Yup from "yup";
import { useFormik } from "formik";
import Password from "../../common/password";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { userLogin } from "../../redux/auth/authActions";
import toast from "react-hot-toast";
import { notifyFailure } from "../../common/notify";
import Mask from "../../common/mask";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter correct email"),

  password: Yup.string().trim().required("Password is Required"),
});
function LogIn({ changePage }: { changePage: () => void }) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      // console.log(values);

      try {
        setIsLoading(true);
        toast.promise(dispatch(userLogin(values)).unwrap(), {
          loading: "Loggin In User",
          success: () => {
            formik.resetForm();
            return "Log In Successful";
          },
          error: (e) => {
            return typeof e == "string"
              ? e
              : "Not able to LogIn,Please try again";
          },
        });
      } catch (e: any) {
        notifyFailure(e?.data?.message || "Not able to LogIn,Please try again");
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <>
      {isLoading && <LinearProgress />}
      {isLoading && <Mask />}
      <div className="p-5  h-max">
        <div className=" flex flex-col gap-4 ">
          <h1 className="font-bold text-gray-700 md:text-4xl  text-2xl text-center mb-4 border-b-2">
            DEPRECIATOR
          </h1>
          <h2 className="font-bold text-gray-500 md:text-2xl text-xl">
            {" "}
            Log In
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
            formik={formik}
            error={
              formik.touched.password ? Boolean(formik.errors.password) : false
            }
            helperText={formik.touched.password ? formik.errors.password! : ""}
          />
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
    </>
  );
}

export default LogIn;
