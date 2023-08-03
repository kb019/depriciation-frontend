import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Component, useEffect, useState } from "react";
import { Box, Button, LinearProgress, Modal, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useLazyGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { AllCategoryResponse } from "../../models/category";
import AddIcon from "@mui/icons-material/Add";
import Search from "../../common/searchComponent";
import Mask from "../../common/mask";
import { useNavigate, useNavigation } from "react-router-dom";
import CustomModal from "../../common/customModal";
import CategoriesModal from "../../components/categoriesModal";
import ModalHoc from "../../common/customModal";

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

  created_at: string
) {
  return { name, created_at };
}

function Categories() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<Partial<AllCategoryResponse>[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const [modelOpen, setModalOpen] = useState<boolean>(false);
  const HOCModal = ModalHoc(CategoriesModal);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const [
    getAllCategories,
    {
      data: categoriesData,
      isLoading: categoriesLoading,
      isFetching: categoriesFetching,
      isError: categoriesError,
    },
  ] = useLazyGetAllCategoriesQuery();

  useEffect(() => {
    if (page == -1) {
      setPage(0);
      return;
    }
    getAllCategories({ page: page + 1, take: rowsPerPage, search: search });
  }, [page]);

  useEffect(() => {
    setPage(-1);
  }, [search]);

  useEffect(() => {
    if (categoriesData?.data) {
      setRows(
        categoriesData!.data.map((data) =>
          createData(data.name, data.created_at)
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
    <div
      className={`w-full h-full ${
        categoriesLoading || categoriesFetching ? "pointer-events-none " : ""
      }`}
    >
      <HOCModal open={modelOpen} setOpen={setModalOpen} />
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
        <div
          className="bg-navitemBg p-2 rounded-full w-10 h-10 flex justify-center items-center shadow-md cursor-pointer hover:scale-90"
          onClick={() => {
            setModalOpen(true);
            // navigate("/addProducts");
          }}
        >
          <AddIcon sx={{ color: "#fffefe" }} />
        </div>
      </div>

      {/* //datatable */}
      <div className="h-[85%] overflow-y-auto  mt-2 relative">
        <Paper className="relative">
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
                  <StyledTableCell align="left" style={{ width: "30%" }}>
                    Name
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: "50%" }}>
                    Created At
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ width: "20%" }}>
                    Actions
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    {/* sx={{ minWidth: 700 }} */}
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">
                      {new Date(row.created_at!).toDateString()}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                      <div className="flex gap-2 items-center justify-center">
                        <Button
                          variant="contained"
                          disableElevation={true}
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
                          <DeleteIcon sx={{ color: "#ea3b3b" }} />
                        </Button>
                        <Button
                          variant="contained"
                          disableElevation={true}
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={categoriesData?.meta.itemCount!}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </div>
  );
}

export default Categories;
