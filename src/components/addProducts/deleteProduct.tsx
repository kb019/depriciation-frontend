import { Button, Stack } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { notifyFailure, notifySuccess } from "../../common/notify";
import { WrappedComponentProps } from "../../models/modalHocType";
import { useDeleteProductByIdMutation } from "../../redux/api/productApiSlice";
import { ModifyProductData } from "../../models/product";

const buttonCss = {
  backgroundColor: "#fa0a5a",
  ":hover": {
    bgcolor: "#fa0a5a", // theme.palette.primary.main
    boxShadow: 1,
    transform: "scale(0.9)",
  },
  boxShadow: 1,
};

function DeleteProduct({ triggerAction, data, close }: WrappedComponentProps) {
  const productData = data as ModifyProductData;
  const [deleteProduct, { isLoading: deletingProduct, isError: deleteError }] =
    useDeleteProductByIdMutation();

  async function deleteProductHandler() {
    try {
      await deleteProduct({ productId: productData.productId }).unwrap();
      triggerAction();
      notifySuccess(`Deleted ${productData.name} product Successfully`);
    } catch (e) {
      notifyFailure("There was a problem deleting category,please try again");
    }
  }
  return (
    <div className="lg:w-[500px] md:w-[400px] w-64">
      <div className="max-w-max ml-auto mb-3 cursor-pointer" onClick={close}>
        <CancelIcon className=" text-gray-600 " />
      </div>
      <h2>{`Are you syre you want to delete ${productData.name} product`}</h2>
      <Stack
        direction="row"
        spacing={2}
        justifyContent={"flex-end"}
        className="mt-5"
      >
        <Button
          onClick={(e) => {
            e.stopPropagation();
            close!();
          }}
          variant="outlined"
          disabled={deletingProduct}
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
          disabled={deletingProduct}
          onClick={(e) => {
            e.stopPropagation();
            deleteProductHandler();
          }}
          sx={buttonCss}
        >
          Delete Product
        </Button>
      </Stack>
    </div>
  );
}

export default DeleteProduct;
