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
import { LinearProgress } from "@mui/material";
import Search from "../../common/searchComponent";
import Mask from "../../common/mask";
import AddIcon from "@mui/icons-material/Add";
import { useLazyGetAllProductsQuery } from "../../redux/api/productApiSlice";
import ProductRow from "../../components/products/productRow";
import { AllProductResponse } from "../../models/product";
import ComponentWithHeader from "../../common/componentWithHeader";
import EmptyTableMessage from "../../components/categories/emptyTableMessage";
import { useNavigate } from "react-router-dom";
import { AddCategoryResponse as CategoryType } from "../../models/category";

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
  updated_at: string,
  category: CategoryType
) {
  return {
    invoiceNumber,
    invoiceDate,
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
    category,
  };
}

function Products() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<AllProductResponse[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const navigate = useNavigate();
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
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
            data.updated_at,
            data.category
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
    <ComponentWithHeader title="Added Products">
      <div
        className={`w-full h-full  ${
          productsLoading || productsFetching ? "pointer-events-none " : ""
        }`}
      >
        <div className="flex sm:flex-row flex-col sm:items-center items-start justify-between gap-4">
          {/* //search */}
          <div className="w-full lg:w-[60%]">
            <Search
              placeHolder="Search Products"
              triggerFunction={(searchVal: string) => {
                setSearch(searchVal);
              }}
            />
          </div>

          {/* //Add product */}
          <div
            className="bg-navitemBg p-2 rounded-full w-10 h-10 flex justify-center items-center shadow-md cursor-pointer hover:scale-90"
            onClick={() => {
              navigate("/addProducts");
            }}
          >
            <AddIcon sx={{ color: "#fffefe" }} />
          </div>
        </div>

        {/* //datatable */}
        <div className="h-[85%]   mt-2 relative">
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
                    <StyledTableCell>Product Name</StyledTableCell>
                    <StyledTableCell>Category Name</StyledTableCell>
                    <StyledTableCell>Invoice Number</StyledTableCell>
                    <StyledTableCell align="center">Modify</StyledTableCell>
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
                  {rows.map((row, i) => (
                    <ProductRow row={row} key={row.id} index={i} />
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
