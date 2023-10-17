import { Box, IconButton, TextField } from "@mui/material";
import { FormikProps } from "formik";
import React, { useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { PasswordProps } from "../models/passwordProps";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Password({ formik, label, helperText, error, name }: PasswordProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <LockIcon sx={{ color: "#B8B8DA", mr: 1,my:0.5}} />
      <TextField
        id="input-with-sx"
        label={label}
        variant="standard"
        name={name}
        type={showPassword ? "text" : "password"}
        onChange={formik.handleChange}
        InputLabelProps={{
          style: { fontWeight: "bold", color: "#B8B8DA" },
        }}
        error={error}
        helperText={helperText}
        fullWidth
      />
      <IconButton
        aria-label="toggle password visibility"
        
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </Box>
  );
}

export default Password;
