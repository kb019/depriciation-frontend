import { Button, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDeleteCategoryByIdMutation } from "../../redux/api/categoryApiSlice";
import { ModifyCategoryData } from "../../models/category";
import { notifyFailure, notifySuccess } from "../../common/notify";
import { WrappedComponentProps } from "../../models/modalHocType";
import { useDeleteProductTypeByIdMutation } from "../../redux/api/productTypeApiSlice";
import {
  ModifyProductTypeInfo,
  ProductTypeEditInfo,
} from "../../models/productTypeInfo";

const buttonCss = {
  backgroundColor: "#fa0a5a",
  ":hover": {
    bgcolor: "#fa0a5a", // theme.palette.primary.main
    boxShadow: 1,
    transform: "scale(0.9)",
  },
  boxShadow: 1,
};

function DeleteProductType({
  triggerAction,
  data,
  close,
}: WrappedComponentProps) {
  const deleteProductTypeInfo = data as ProductTypeEditInfo;
  //   const [
  //     deleteCategory,
  //     { isLoading: deletingCategory, isError: deleteError },
  //   ] = useDeleteCategoryByIdMutation();

  const [
    deleteProductType,
    { isLoading: deletingProductType, isError: deleteError },
  ] = useDeleteProductTypeByIdMutation();

  async function deleteProductTypeHandler() {
    try {
      await deleteProductType({
        productTypeId: deleteProductTypeInfo.productId,
      }).unwrap();
      triggerAction();
      notifySuccess(
        `Deleted ${deleteProductTypeInfo.productName} Category Successfully`
      );
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
      <h2>{`All items tagged with ${deleteProductTypeInfo.productName} Type  will be deleted!`}</h2>
      <Stack
        // spacing={2}
        justifyContent={"flex-end"}
        className="mt-5"
        spacing={{ xs: 3, sm: 3, md: 3 }}
        direction={{ sm: "column", md: "row" }}


      >
        <Button
          onClick={() => {
            close!();
          }}
          variant="outlined"
          disabled={deletingProductType}
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
          disabled={deletingProductType}
          onClick={deleteProductTypeHandler}
          sx={buttonCss}
        >
          Delete Product Type
        </Button>
      </Stack>
    </div>
  );
}

export default DeleteProductType;
