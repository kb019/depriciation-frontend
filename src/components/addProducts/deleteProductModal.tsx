import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import ModalHoc from "../../common/customModal";
import { ModifyBtnProps, ModifyCategoryData } from "../../models/category";
import DeleteProduct from "./deleteProduct";
import { ModifyProductBtnProps } from "../../models/product";


function DeleteProductModal({ triggerAction, data }: ModifyProductBtnProps) {
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const HOCModal = ModalHoc(DeleteProduct);
  return (
    <>
      <HOCModal
        open={modelOpen}
        setOpen={setModalOpen}
        triggerAction={() => {
          triggerAction();
          setModalOpen(false);
        }}
        data={data}
      />
      <Button
        variant="contained"
        disableElevation={true}
        onClick={(e) => {
            e.stopPropagation();
          setModalOpen(true);
        }}
        sx={{
          backgroundColor: "#fbfbfa33",
          minWidth: "40px",
          maxWidth: "40px",
          ":hover": {
            bgcolor: "white", // theme.palette.primary.main
            color: "white",
            boxShadow: 1,
            transform: "scale(0.88)",
          },
          boxShadow: 1,
        }}
      >
        <DeleteIcon sx={{ color: "#ea3b3b" }} />
      </Button>
    </>
  );
}

export default DeleteProductModal;
