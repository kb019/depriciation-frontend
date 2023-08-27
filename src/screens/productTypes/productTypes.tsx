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
import ComponentWithHeader from "../../common/componentWithHeader";
import { useLazyGetAllProductsTypeQuery } from "../../redux/api/productTypeApiSlice";
import EditProductTypeBtnModal from "../../components/productTypes/editProductTypeBtnModal";
import DeleteProductTypeBtnModal from "../../components/productTypes/deleteProductTypeModal";
import EmptyTableMessage from "../../components/categories/emptyTableMessage";
import AddproductBtnModal from "../../components/products/addProductBtnModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
    color: "#4b4545",
  },
  [`&.${tableCellClasses.body}`]: {
    // color: "#ccc",
    fontSize: 14,
  },
  height: 30,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  minHeight: 5,

  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  td: {
    padding: "0px 16px",
    height: "50px",
  },
}));

function createData(
  productName: string,
  categoryName: string,
  id: string,
  created_at: string,
  updated_at: string,
  categoryId: string
) {
  return { productName, categoryName, created_at, updated_at, id, categoryId };
}

type Row = ReturnType<typeof createData>;

function ProductTypes() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<Row[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [
    getAllProductsType,
    {
      data: productsTypeData,
      isLoading: productsTypeLoading,
      isFetching: productsTypeFetching,
      isError: productsTypeError,
    },
  ] = useLazyGetAllProductsTypeQuery();

  const getProductsType = () => {
    getAllProductsType({
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
    getProductsType();
  }, [page]);

  useEffect(() => {
    setPage(-1);
  }, [search]);

  useEffect(() => {
    if (productsTypeData?.data) {
      console.log(productsTypeData?.data);
      setRows(
        productsTypeData!.data.map((data) =>
          createData(
            data.productType,
            data.category.name,
            data.id,
            data.created_at,
            data.updated_at,
            data.category.id
          )
        )
      );
    }
  }, [productsTypeData]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log("changing page", event.target.value);
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
          productsTypeLoading || productsTypeFetching
            ? "pointer-events-none "
            : ""
        }`}
      >
        <div className="flex  sm:items-center items-start sm:flex-row flex-col justify-between gap-4">
          {/* //search */}
          <div className="w-full lg:w-[60%]">
            <Search
              placeHolder="Search Product Types"
              triggerFunction={(searchVal: string) => {
                setSearch(searchVal);
              }}
            />
          </div>

          {/* //Add product Type*/}
          <AddproductBtnModal
            triggerAction={() => {
              setPage(-1);
            }}
          />
        </div>

        {/* //datatable */}
        <div className="h-[85%] overflow-y-auto  mt-2 relative">
          <Paper className="relative shadow-xl">
            {(productsTypeFetching || productsTypeLoading) && <Mask />}
            <div
              className={`w-fll ${
                productsTypeLoading || productsTypeFetching
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
                  <TableRow>
                    <StyledTableCell align="left">Product Name</StyledTableCell>
                    <StyledTableCell align="center">
                      Category Name
                    </StyledTableCell>
                    <StyledTableCell align="center">Created At</StyledTableCell>
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
                              ? "Please add Categories"
                              : "No categories in this name"
                          }
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      {/* sx={{ minWidth: 700 }} */}
                      <StyledTableCell
                        align="left"
                        style={{ minWidth: 150, overflowWrap: "break-word" }}
                      >
                        {row.productName}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        style={{ minWidth: 150, overflowWrap: "break-word" }}
                      >
                        {row.categoryName}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        style={{ minWidth: 150, overflowWrap: "break-word" }}
                      >
                        {new Date(row.created_at!).toDateString()}
                      </StyledTableCell>

                      <StyledTableCell
                        align="center"
                        style={{ minWidth: 150, overflowWrap: "break-word" }}
                      >
                        <div className="flex gap-2 items-center justify-center">
                          <DeleteProductTypeBtnModal
                            triggerAction={() => {
                              getProductsType();
                            }}
                            data={{
                              categoryId: row.categoryId,
                              categoryName: row.categoryName!,
                              productName: row.productName,
                              productId: row.id,
                            }}
                          />
                          <EditProductTypeBtnModal
                            data={{
                              categoryId: row.categoryId,
                              categoryName: row.categoryName!,
                              productName: row.productName,
                              productId: row.id,
                            }}
                            triggerAction={() => {
                              getProductsType();
                            }}
                          />
                        </div>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={productsTypeData?.meta.itemCount! || 0}
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

export default ProductTypes;
