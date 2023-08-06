import { useState } from "react";
import ModalHoc from "../../common/customModal";
import CategoriesModal from "./addEditCategory";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ModifyBtnProps, ModifyCategoryData } from "../../models/category";

const EditBtnModal = ({ data, triggerAction }: ModifyBtnProps) => {
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const HOCModal = ModalHoc(CategoriesModal);
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
        onClick={() => {
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
        <EditIcon sx={{ color: "#918d8d" }} />
      </Button>
    </>
  );
};

export default EditBtnModal;
