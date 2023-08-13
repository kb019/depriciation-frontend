import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useLazyGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { AllCategoryResponse } from "../../models/category";
import Search from "../../common/searchComponent";
import Mask from "../../common/mask";
import AddcategoryButnModal from "../../components/categories/addCategoryBtnModal";
import EditBtnModal from "../../components/categories/editbtnModal";
import DeleteBtnModal from "../../components/categories/deleteBtnModal";
import AddIcon from "@mui/icons-material/Add";
import EmptyTableMessage from "../../components/categories/emptyTableMessage";
import { useNavigate } from "react-router-dom";
import ComponentWithHeader from "../../common/componentWithHeader";
import { useLazyGetAllProductsQuery } from "../../redux/api/productApiSlice";
import { AddProductResponse, AllProductResponse } from "../../models/product";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

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
  border:0,
  paddingTop: 0,
  paddingBottom: 0,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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

function createData(
  invoiceNumber: string,
  invoiceDate: Date,
  categoryName: string,
  categoryId: string,
  supplierName: string,
  supplierAddress: string,
  productName: string,
  purchaseDate: Date,
  quantity: number,
  price: number,
  cgst: number,
  sgst: number,
  id: string,
  created_at: string,
  updated_at: string
) {
  return {
    invoiceNumber,
    invoiceDate,
    categoryName,
    categoryId,
    supplierName,
    supplierAddress,
    productName,
    purchaseDate,
    quantity,
    price,
    cgst,
    sgst,
    id,
    created_at,
    updated_at,
  };
}

function Row(props: { row: AllProductResponse,index:number }) {
  const { row,index } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <StyledTableRow
        key={row.id}
        className={`${index%2==0?"bg-gray-100":""}`}
        sx={{ "& > *": { borderBottom: "unset" } }}
        style={{height:50}}
      >
        {/* sx={{ minWidth: 700 }} */}
        <StyledTableCell style={{minWidth:50,maxWidth:50}}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell style={{minWidth:150,maxWidth:150,overflowWrap:"break-word"}}>{row.categoryName}</StyledTableCell>

        <StyledTableCell style={{minWidth:150,maxWidth:150,overflowWrap:"break-word"}}>{row.productName}</StyledTableCell>
        <StyledTableCell style={{minWidth:150,maxWidth:150,overflowWrap:"break-word"}}>
          {new Date(row.updated_at!).toDateString()}
        </StyledTableCell>
    

        <StyledTableCell align="center">
          <div className="flex gap-2 items-center justify-center">
            <DeleteBtnModal
          triggerAction={() => {
            // getProducts();
          }}
          data={{ name: row.categoryName!, categoryId: row.id! }}
        />
        <EditBtnModal
          data={{ name: row.categoryName!, categoryId: row.id! }}
          triggerAction={() => {
            // getProducts();
          }}
        />
          </div>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow style={{ paddingBottom: 0, paddingTop: 0 }}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          // colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Product Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Purchase Date</TableCell>
                    <TableCell> CGST(%)</TableCell>
                    <TableCell>SGST(%)</TableCell>
                    <TableCell> Quantity</TableCell>
                    <TableCell align="right">Amount(₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.productName}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {new Date(row.purchaseDate!).toDateString()}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.cgst}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.sgst}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.quantity}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.price}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow style={{ paddingBottom: 0, paddingTop: 0 }}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          // colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Supplier Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Supplier Name</TableCell>
                    <TableCell align="center" className="w-32">
                      Supplier Address
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        minWidth: 400,
                        maxWidth: 400,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.supplierName}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        minWidth: 700,
                        maxWidth: 700,
                        overflowWrap: "break-word",
                      }}
                    >
                      {
                        "fddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow style={{ paddingBottom: 0, paddingTop: 0 }}>
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Invoice Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Invoice Number</TableCell>
                    <TableCell>Invoice Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        minWidth: 150,
                        maxWidth: 150,
                        overflowWrap: "break-word",
                      }}
                    >
                      {row.invoiceNumber}
                    </TableCell>
                    <TableCell
                      style={{
                        minWidth: 50,
                        maxWidth: 50,
                        overflowWrap: "break-word",
                      }}
                    >
                      {new Date(row.invoiceDate!).toDateString()}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

function Products() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<AllProductResponse[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const navigate = useNavigate();
  const [
    getAllProducts,
    {
      data: productData,
      isLoading: productsLoading,
      isFetching: productsFetching,
      isError: productsError,
    },
  ] = useLazyGetAllProductsQuery();

  const getProducts = () => {
    getAllProducts({
      page: page + 1,
      take: rowsPerPage,
      search: search.trim(),
    });
  };
  useEffect(() => {
    if (page == -1) {
      setPage(0);
      return;
    }
    getProducts();
  }, [page]);

  useEffect(() => {
    setPage(-1);
  }, [search]);

  useEffect(() => {
    if (productData?.data) {
      setRows(
        productData!.data?.map((data) =>
          createData(
            data.invoiceNumber!,
            data.invoiceDate!,
            data.categoryName,
            data.categoryId,
            data.supplierName,
            data.supplierAddress,
            data.productName,
            data.purchaseDate!,
            data.quantity!,
            data.price!,
            data.cgst!,
            data.sgst!,
            data.id,
            data.created_at,
            data.updated_at
          )
        )
      );
    }
  }, [productData]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    //due to categories depency on page,if its already on page one and rows change,then setting it to page 0 does not work,so i put both page -1 and page0
    setPage(-1);
    //when we do immediate updates like this react stages them together abd updates it as zero,so it is as if -1 was not set.
    //setPage(-1)
    // setPage(0);
  };
  return (
    <ComponentWithHeader title="Added Categories">
      <div
        className={`w-full h-full  ${
          productsLoading || productsFetching ? "pointer-events-none " : ""
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* //search */}
          <div className="w-full lg:w-[60%]">
            <Search
              triggerFunction={(searchVal: string) => {
                setSearch(searchVal);
              }}
            />
          </div>

          {/* //Add product */}
          <AddcategoryButnModal
            triggerAction={() => {
              setPage(-1);
            }}
          />
        </div>

        {/* //datatable */}
        <div className="h-[85%] overflow-y-auto  mt-2 relative">
          <Paper className="relative shadow-xl">
            {(productsLoading || productsFetching) && <Mask />}
            <div
              className={`w-fll ${
                productsLoading || productsFetching
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <LinearProgress />
            </div>
            <TableContainer>
              <Table
                sx={{ minWidth: 400 }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow style={{ height: 50 }}>
                    <StyledTableCell />
                    <StyledTableCell  >
                      Name
                    </StyledTableCell>
                    <StyledTableCell >
                      Created At
                    </StyledTableCell>
                    <StyledTableCell  >
                      Add
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      Modify
                    </StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length == 0 && (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4}>
                        <EmptyTableMessage
                          msg={
                            search.length == 0
                              ? "Please add Products"
                              : "No Products in this name"
                          }
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {rows.map((row,i) => (
                    <Row row={row} key={row.id} index={i}/>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={productData?.meta.itemCount! || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
    </ComponentWithHeader>
  );
}

export default Products;
