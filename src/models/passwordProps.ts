import { FormikProps } from "formik";
import { SignUpValues } from "./signUpValues";
import { LogInProps } from "./loginProps";

export interface PasswordProps {
  formik: FormikProps<SignUpValues>|FormikProps<LogInProps>;
  error: boolean;
  helperText: string;
  label: string;
  name: string;
}
