import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { WrappedComponentProps } from "../../models/modalHocType";
import {
  useAddNewCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/api/categoryApiSlice";
import { notifyFailure } from "../../common/notify";
import CancelIcon from "@mui/icons-material/Cancel";
import { ModifyCategoryData } from "../../models/category";
import toast from "react-hot-toast";

const buttonCss = {
  backgroundColor: "#6A00F4",
  ":hover": {
    bgcolor: "#6A00F4", // theme.palette.primary.main
    boxShadow: 1,
    transform: "scale(0.9)",
  },
  boxShadow: 1,
};
function CategoriesModal({
  close,
  triggerAction,
  data,
}: WrappedComponentProps) {
  const categoryData = data as ModifyCategoryData;
  console.log(categoryData);
  const [addNewCategory, { isLoading: addingCategory }] =
    useAddNewCategoryMutation();
  const [updateCategory, { isLoading: updatingCategory }] =
    useUpdateCategoryMutation();
  const [categoryName, setCategoryName] = useState<string>(
    `${categoryData?.name ? categoryData.name : ""}`
  );
  const [error, setError] = useState<boolean>(false);

  async function addCategoryHandler() {
    if (categoryName.trim().length == 0) {
      setError(true);
      return;
    }
    try {
      // await addNewCategory({ name: categoryName }).unwrap();
      // notifySuccess("Category added successfully");
      // setCategoryName("");
      // triggerAction();
      toast.promise(addNewCategory({ name: categoryName }).unwrap(), {
        loading: "Adding Category",
        success: () => {
          setCategoryName("");
          triggerAction();
          return "Category added Successfully";
        },
        error: () => "Not able to add category,Please try again.",
      });
    } catch (e) {
      notifyFailure("Category with this type already exists");
    }
  }

  async function editCategoryHandler() {
    try {
      // await updateCategory({
      //   categoryId: categoryData?.categoryId,
      //   name: categoryName,
      // }).unwrap();
      // notifySuccess("Updated Category successfully");
      // setCategoryName("");
      // triggerAction();
      toast.promise(
        updateCategory({
          categoryId: categoryData?.categoryId,
          name: categoryName,
        }).unwrap(),
        {
          loading: "Updating Category",
          success: () => {
            setCategoryName("");
            triggerAction();
            return "Category updated Successfully";
          },
          error: () => "Not able to update category,Please try again.",
        }
      );
    } catch (e) {
      notifyFailure("There was problem updating category, Please try again");
    }
  }
  return (
    <div className="lg:w-[500px] md:w-[400px] w-64">
      <div className="max-w-max ml-auto mb-3 cursor-pointer" onClick={close}>
        <CancelIcon className=" text-gray-600 " />
      </div>
      <TextField
        error={error}
        id="outlined-basic"
        label="Category Name"
        value={categoryName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCategoryName(event.target.value);
        }}
        variant="outlined"
        fullWidth={true}
        helperText={!error ? "" : "Please enter category Name"}
      />
      <Stack
        spacing={{ xs: 3, sm: 3, md: 3 }}
        direction={{ sm: "column", md: "row" }}
        justifyContent={"flex-end"}
        className="mt-5"
      >
        <Button
          onClick={() => {
            close!();
          }}
          variant="outlined"
          disabled={addingCategory}
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

        {categoryData?.name ? (
          <Button
            variant="contained"
            disabled={updatingCategory || categoryName == categoryData?.name}
            onClick={editCategoryHandler}
            sx={buttonCss}
          >
            Edit
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={addingCategory}
            onClick={addCategoryHandler}
            sx={buttonCss}
          >
            Add
          </Button>
        )}
      </Stack>
    </div>
  );
}

export default CategoriesModal;
