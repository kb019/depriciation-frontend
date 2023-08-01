import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CategoriesModal from '../components/categoriesModal';

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "max-content",
    bgcolor: "background.paper",
    boxShadow: 24,
    outline: "none",
    border:"none",
    p: 4,
  };

function CustomModal({component}:{component:any}) {

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);  
  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    style={{ outline: "none" }}
  >
  
    <Box sx={style}>
    {component}     
    </Box>
  </Modal>
  )
}

export default CustomModal;