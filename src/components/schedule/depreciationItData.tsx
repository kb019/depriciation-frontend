import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DepreciationItData } from "../../models/deprectionItData";

function Row(props: { row: DepreciationItData; year: number }) {
  const { row, year } = props;
  const [open, setOpen] = React.useState(true);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <h2 className="font-semibold text-gray-700">{row.categoryName}</h2>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ borderBottom: 0 }}></TableCell>
                    <TableCell style={{ borderBottom: 0 }}></TableCell>
                    <TableCell style={{ borderBottom: 0 }}></TableCell>
                    <TableCell
                      align="center"
                      colSpan={3}
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      Additions
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      Product Type
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      RATE OF DEPN
                    </TableCell>
                    <TableCell
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      W.D.V AS ON 01.04.{year}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      BEFORE 180 DAYS
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      AFTER 180 DAYS
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      TOTAL AS ON 31.03.{year + 1}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      DEPRECIATION FOR THE YEAR
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#626060",
                      }}
                    >
                      W.D.V AS ON 31.03.{year + 1}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.data.map((rateRow) => (
                    <TableRow key={rateRow.productType}>
                      <TableCell component="th" scope="row">
                        {rateRow.productType}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {Math.round(rateRow.rateOfDepn * 100)} %
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-IN").format(
                          rateRow.wdvstart
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("en-IN").format(
                          rateRow.before180Days
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("en-IN").format(
                          rateRow.after180Days
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("en-IN").format(rateRow.total)}
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("en-IN").format(
                          rateRow.depForYear
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {new Intl.NumberFormat("en-IN").format(rateRow.wdvend)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell style={{fontWeight:600}}>
                      {new Intl.NumberFormat("en-IN").format(
                        row.meta.total_wdvstart
                      )}
                    </TableCell>
                    <TableCell align="center" style={{fontWeight:600}}>
                      {new Intl.NumberFormat("en-IN").format(
                        row.meta.total_before180Days
                      )}
                    </TableCell>
                    <TableCell align="center" style={{fontWeight:600}}>
                      {new Intl.NumberFormat("en-IN").format(
                        row.meta.total_after180Days
                      )}
                    </TableCell>
                    <TableCell align="center" style={{fontWeight:600}}>
                      {new Intl.NumberFormat("en-IN").format(
                        row.meta.total_total
                      )}
                    </TableCell>

                    <TableCell align="center" style={{fontWeight:600}}>
                      {new Intl.NumberFormat("en-IN").format(
                        row.meta.total_depForYear
                      )}
                    </TableCell>
                    <TableCell align="center" style={{fontWeight:600}}>
                      {new Intl.NumberFormat("en-IN").format(
                        row.meta.total_wdvend
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function DepreciationItDataTable({
  data,
  year,
}: {
  data: DepreciationItData[];
  year: number;
}) {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 450 }}>
      <Table aria-label="collapsible table" stickyHeader>
        <TableHead></TableHead>
        <TableBody>
          {data.map((row) => (
            <Row key={row.categoryName} row={row} year={year} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
