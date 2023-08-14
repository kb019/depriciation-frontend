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
import { Button, LinearProgress } from "@mui/material";
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
  name: string,
  id: string,
  created_at: string,
  updated_at: string
) {
  return { name, created_at, updated_at, id };
}

function Categories() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<Partial<AllCategoryResponse>[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const navigate = useNavigate();
  const [
    getAllCategories,
    {
      data: categoriesData,
      isLoading: categoriesLoading,
      isFetching: categoriesFetching,
      isError: categoriesError,
    },
  ] = useLazyGetAllCategoriesQuery();

  const getCategories = () => {
    getAllCategories({
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
    getCategories();
  }, [page]);

  useEffect(() => {
    setPage(-1);
  }, [search]);

  useEffect(() => {
    if (categoriesData?.data) {
      setRows(
        categoriesData!.data.map((data) =>
          createData(data.name, data.id, data.created_at, data.updated_at)
        )
      );
    }
  }, [categoriesData]);

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
          categoriesLoading || categoriesFetching ? "pointer-events-none " : ""
        }`}
      >
        <div className="flex  sm:items-center items-start sm:flex-row flex-col justify-between gap-4">
          {/* //search */}
          <div className="w-full lg:w-[60%]">
            <Search
            placeHolder="Search Categories"
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
            {(categoriesFetching || categoriesLoading) && <Mask />}
            <div
              className={`w-fll ${
                categoriesLoading || categoriesFetching
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
                    <StyledTableCell align="left" >
                      Name
                    </StyledTableCell>
                    <StyledTableCell align="center" >
                      Created At
                    </StyledTableCell>
                    <StyledTableCell align="center" >
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
                              ? "Please add Categories"
                              : "No categories in this name"
                          }
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                      {/* sx={{ minWidth: 700 }} */}
                      <StyledTableCell align="left" style={{minWidth:150,overflowWrap:"break-word"}}>{row.name}</StyledTableCell>
                      <StyledTableCell align="center" style={{minWidth:150,overflowWrap:"break-word"}}>
                        {new Date(row.created_at!).toDateString()}
                      </StyledTableCell>
                      <StyledTableCell align="center" style={{minWidth:200,overflowWrap:"break-word"}}>
                        <Button
                          startIcon={<AddIcon sx={{ color: "#9a0afa" }} />}
                          variant="outlined"
                          sx={{
                            border: "1px solid #9a0afa",
                            color: "#9a0afa",
                            padding: 0,
                            paddingX: 1,
                            fontSize: 14,
                            ":hover": {
                              bgcolor: "white", // theme.palette.primary.main
                              boxShadow: 1,
                              transform: "scale(0.95)",
                              border: "1px solid #9a0afa",
                            },
                            boxShadow: 1,
                          }}
                          onClick={() => {
                            navigate("/addProducts", {
                              state: {
                                categoryId: row.id,
                                categoryName: row.name,
                              },
                            });
                          }}
                        >
                          Add Products
                        </Button>
                      </StyledTableCell>

                      <StyledTableCell align="center" style={{minWidth:150,overflowWrap:"break-word"}}>
                        <div className="flex gap-2 items-center justify-center">
                          <DeleteBtnModal
                            triggerAction={() => {
                              getCategories();
                            }}
                            data={{ name: row.name!, categoryId: row.id! }}
                          />
                          <EditBtnModal
                            data={{ name: row.name!, categoryId: row.id! }}
                            triggerAction={() => {
                              getCategories();
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
              count={categoriesData?.meta.itemCount! || 0}
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

export default Categories;
