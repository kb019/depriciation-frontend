import { useState } from "react";
import ModalHoc from "../../common/customModal";
import CategoriesModal from "./addEditCategory";
import AddIcon from "@mui/icons-material/Add";

function AddcategoryButnModal({
  triggerAction,
}: {
  triggerAction: () => void;
}) {
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
      />

      <div
        className="bg-navitemBg p-2 rounded-full w-10 h-10 flex justify-center items-center shadow-md cursor-pointer hover:scale-90"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <AddIcon sx={{ color: "#fffefe" }} />
      </div>
    </>
  );
}

export default AddcategoryButnModal;
