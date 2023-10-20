import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { ModalHocType } from "../models/modalHocType";

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

const ModalHoc: ModalHocType = (Component) => {
  return function CustomModal(props) {
    const { open, setOpen } = props;
    const handleClose = () => setOpen(false);
    return (
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{ outline: "none" }}
      >
        <Box sx={style}>
          {
            <Component
              {...props}
              close={() => {
                handleClose();
              }}
              triggerAction={() => {
                props.triggerAction();
              }}
            />
          }
        </Box>
      </Modal>
    );
  };
};

export default ModalHoc;
