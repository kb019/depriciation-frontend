import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
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
import EmptyTableMessage from "../../components/categories/emptyTableMessage";
import AddproductBtnModal from "../../components/products/addProductBtnModal";
import { useLocation } from "react-router-dom";
import { notifyFailure } from "../../common/notify";
import { useLazyGetAllRatesQuery } from "../../redux/api/depreciationItApiSlice";
import { StyledTableRow } from "../../components/products/productRow";
import { StyledTableCell } from "./productTypes";
import RatesItRow from "../../components/productTypes/ratesIrRow";
import InfoMessage from "../../common/infoMessage";
import ApiError from "../../common/apiError";

export type DepItRowType = ReturnType<typeof createData>;

export function createData(
  id: string,
  depYear: number,
  depRate: number | null,
  updatedAt: Date
) {
  return {
    id,
    depYear,
    depRate,
    updatedAt,
  };
}

type Row = ReturnType<typeof createData>;

function RatesIt() {
  const { state } = useLocation();
  if (!state)
    return (
      <InfoMessage message="  Please select a product type to View all the depreciation rates" />
    );
  const { productTypeName, productTypeId } = state;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [rows, setRows] = useState<Row[] | []>([]);
  const [search, setSearch] = useState<string>("");
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [
    getAllRatesByProductType,
    {
      data: productsTypeRatesData,
      isLoading: productsTypeRatesLoading,
      isFetching: productsTypeRatesFetching,
      isError: productsTypeRatesError,
    },
  ] = useLazyGetAllRatesQuery();

  const getProductsTypeRate = () => {
    try {
      getAllRatesByProductType({
        page: page + 1,
        take: rowsPerPage,
        search: search.trim(),
        productTypeId: productTypeId,
      });
    } catch (e) {
      notifyFailure("Unable to get all Product Types");
    }
  };
  useEffect(() => {
    if (page == -1) {
      setPage(0);
      return;
    }
    getProductsTypeRate();
  }, [page]);

  useEffect(() => {
    setPage(-1);
  }, [search]);

  useEffect(() => {
    if (productsTypeRatesData?.data) {
      setRows(
        productsTypeRatesData!.data.map((data) =>
          createData(
            data.id,
            data.depYear,
            data.depreciationRate,
            data.updated_at
          )
        )
      );
    }
  }, [productsTypeRatesData]);

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

  if (productsTypeRatesError) {
    return (
      <ApiError
        refecthAction={() => {
          getProductsTypeRate();
        }}
      />
    );
  }
  return (
    <ComponentWithHeader title="Depreciation It Rates">
      <div
        className={`w-full h-full  overflow-y-hidden ${
          productsTypeRatesLoading || productsTypeRatesFetching
            ? "pointer-events-none "
            : ""
        }`}
      >
        <div className="flex  sm:items-center items-start sm:flex-row flex-col justify-between gap-4">
          {/* //search */}
          <div className="w-full lg:w-[60%]">
            <Search
              placeHolder="Search By Year"
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

        <div className=" flex gap-2 bg-gray-400 px-2 max-w-max text-white font-semibold rounded-3xl my-4">
          <p>Product Type</p>
          <p>-</p>
          <p>{productTypeName}</p>
        </div>

        {/* //datatable */}
        <div className="h-[85%] overflow-y-auto  mt-2 relative">
          <Paper className="relative shadow-xl" sx={{ overflow: "hidden" }}>
            {(productsTypeRatesFetching || productsTypeRatesLoading) && (
              <Mask />
            )}
            <div
              className={`w-fll ${
                productsTypeRatesLoading || productsTypeRatesFetching
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <LinearProgress />
            </div>
            <TableContainer sx={{ maxHeight: 360 }}>
              <Table
                sx={{ minWidth: 400 }}
                aria-label="customized table"
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="left">Year</StyledTableCell>
                    <StyledTableCell align="center">
                      Rate Percent %
                    </StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    <StyledTableCell align="center">
                      Last Update
                    </StyledTableCell>
                    {/* <StyledTableCell align="center">Modify</StyledTableCell> */}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {rows.length == 0 && (
                    <StyledTableRow>
                      <StyledTableCell colSpan={4}>
                        <EmptyTableMessage
                          msg={
                            search.length == 0
                              ? "Please add product under this product type"
                              : "No Rates for this year"
                          }
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  )}
                  {rows?.length > 0 &&
                    rows.map((row) => <RatesItRow row={row} key={row.id} />)}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={productsTypeRatesData?.meta.itemCount! || 0}
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

export default RatesIt;
