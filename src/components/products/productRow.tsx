import { AllProductResponse } from "../../models/product";
import {
  Button,
  TableCell,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import DeleteBtnModal from "../categories/deleteBtnModal";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteProductModal from "../addProducts/deleteProductModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    color: "#4b4545",
  },
  [`&.${tableCellClasses.body}`]: {
    // color: "#ccc",
    fontSize: 14,
  },
  // height: 30,
  border: 0,
  paddingTop: 0,
  paddingBottom: 0,
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
  },
  // minHeight: 5,

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  border: 0,
  td: {
    // padding: "0px 16px",
    // height: "50px",
  },
}));

function ProductRow(props: {
  row: AllProductResponse;
  index: number;
  triggerFetch: () => void;
}) {
  const { row, index, triggerFetch } = props;
  const navigate = useNavigate();
  return (
    <>
      <StyledTableRow
        key={row.id}
        className={`${
          index % 2 == 0 ? "bg-gray-100" : ""
        } cursor-pointer hover:bg-blue-100`}
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={{ height: 50 }}
        onClick={() => {
          navigate(`info/${row.id}`);
        }}
      >
        {/* sx={{ minWidth: 700 }} */}

        <StyledTableCell style={{ minWidth: 150, overflowWrap: "break-word" }}>
          {row.productName}
        </StyledTableCell>

        <StyledTableCell style={{ minWidth: 150, overflowWrap: "break-word" }}>
          {row.productType.category?.name}
        </StyledTableCell>
        <StyledTableCell style={{ minWidth: 150, overflowWrap: "break-word" }}>
          {row.invoiceNumber}
        </StyledTableCell>

        <StyledTableCell align="center">
          <div className="flex gap-2 items-center justify-center">
            <DeleteProductModal
              triggerAction={() => {
                triggerFetch();
              }}
              data={{ name: row.productName, productId: row.id }}
            />
            <Button
              variant="contained"
              disableElevation={true}
              onClick={(e) => {
                e.stopPropagation();
                navigate("/addProducts", {
                  state: {
                    productId: row.id,
                  },
                });
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
          </div>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default ProductRow;
