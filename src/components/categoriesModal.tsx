import { Button, Stack, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

function CategoriesModal() {
  return (
    <div className="lg:w-[500px] md:w-[400px] w-64">
      <TextField
       error={false}
        id="outlined-basic"
        label="Category Name"
        variant="outlined"
        fullWidth={true}
        helperText="Please enter category Name"
      />
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"flex-end"}
        className="mt-5"
      >
        <Button
          variant="outlined"
          sx={{
            border: "1px solid #6A00F4",
            color: "#6A00F4",
            ":hover": {
              bgcolor: "white", // theme.palette.primary.main
              boxShadow: 1,
              transform: "scale(0.9)",
              border: "1px solid #6A00F4",
            },
            boxShadow: 1,
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor:"#6A00F4",
            ":hover": {
              bgcolor: "#6A00F4", // theme.palette.primary.main
              boxShadow: 1,
              transform: "scale(0.9)",
            },
            boxShadow: 1,
          }}
        >
          Add
        </Button>
      </Stack>
    </div>
  );
}

export default CategoriesModal;
