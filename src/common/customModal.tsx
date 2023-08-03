import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import CategoriesModal from "../components/categoriesModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  border: "none",
  p: 4,
};

export type WrappedComponentProps = {
  
  open: boolean;
  setOpen:React.Dispatch<boolean>;
  close?:()=>void;
};




type ModalHocType = <T extends WrappedComponentProps>(
  Component: React.ComponentType<T>
) => React.FC<T>;

const ModalHoc:ModalHocType = (Component) => {
 return  function CustomModal(props) {
  const {open,setOpen}=props;
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    console.log("props is ",props);
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ outline: "none" }}
      >
        <Box sx={style}>{<Component {...props} close={()=>{
          handleClose();
        }}/>}</Box>
      </Modal>
    );
  }
};

export default ModalHoc;
