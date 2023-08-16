import { Button, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDeleteCategoryByIdMutation } from "../../redux/api/categoryApiSlice";
import { ModifyCategoryData } from "../../models/category";
import { notifyFailure, notifySuccess } from "../../common/notify";
import { WrappedComponentProps } from "../../models/modalHocType";

const buttonCss = {
  backgroundColor: "#fa0a5a",
  ":hover": {
    bgcolor: "#fa0a5a", // theme.palette.primary.main
    boxShadow: 1,
    transform: "scale(0.9)",
  },
  boxShadow: 1,
};

function DeteteCategory({ triggerAction, data, close }: WrappedComponentProps) {
  const categoryData = data as ModifyCategoryData;
  const [
    deleteCategory,
    { isLoading: deletingCategory, isError: deleteError },
  ] = useDeleteCategoryByIdMutation();

  async function deleteCategoryHandler() {
    try {
      await deleteCategory({ categoryId: categoryData.categoryId }).unwrap();
      triggerAction();
      notifySuccess(`Deleted ${categoryData.name} Category Successfully`);
    } catch (e) {
      notifyFailure("There was a problem deleting category,please try again");
    }
  }
  return (
    <div className="lg:w-[500px] md:w-[400px] w-64">
      <div
        className="max-w-max ml-auto mb-3 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          close!();
        }}
      >
        <CancelIcon className=" text-gray-600 " />
      </div>
      <h2>{`All items tagged with ${categoryData.name} Category will be deleted!`}</h2>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"flex-end"}
        className="mt-5"
      >
        <Button
          onClick={() => {
            close!();
          }}
          variant="outlined"
          disabled={deletingCategory}
          sx={{
            border: "1px solid #fa0a5a",
            color: "#fa0a5a",
            ":hover": {
              bgcolor: "white", // theme.palette.primary.main
              boxShadow: 1,
              transform: "scale(0.9)",
              border: "1px solid #fa0a5a",
            },
            boxShadow: 1,
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          disabled={deletingCategory}
          onClick={deleteCategoryHandler}
          sx={buttonCss}
        >
          Delete Category
        </Button>
      </Stack>
    </div>
  );
}

export default DeteteCategory;
