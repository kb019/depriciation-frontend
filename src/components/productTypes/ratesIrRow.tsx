import { useState } from "react";
import { StyledTableRow } from "../products/productRow";
import { StyledTableCell } from "../../screens/productTypes/productTypes";
import { DepItRowType } from "../../screens/productTypes/ratesIt";
import { Button, TextField, styled } from "@mui/material";
import { useUpdateDepriciationItRateMutation } from "../../redux/api/depreciationItApiSlice";
import { notifyFailure, notifySuccess } from "../../common/notify";

export const StyledInput = styled(TextField)(({}) => ({
  "& .MuiInputBase-input": {
    height: 10,
    width: 30,
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0,
  },
}));

function RatesItRow({ row }: { row: DepItRowType }) {
  const [initialValue, setInitialValue] = useState<number | null>(row.depRate);
  const [userInputValue, setUserInputValue] = useState<number | null>(
    initialValue
  );
  const [recentUpdate, setRecentUpdate] = useState<Date | null>(
    new Date(row.updatedAt)
  );
  const [updateDepRate, { isLoading: updatingItRate }] =
    useUpdateDepriciationItRateMutation();

  async function updateRates() {
    try {
      const res = await updateDepRate({
        depreciationItId: row.id,
        depreciationItRate: userInputValue + "",
      }).unwrap();
      notifySuccess(`Successfully Updated for the year ${row.depYear}`);
      setInitialValue(res.depreciationRate);
      setRecentUpdate(new Date(res.updated_at));
    } catch (e) {
      notifyFailure(`Unable update for the year ${row.depYear}`);
      setUserInputValue(initialValue);
    }
  }
  return (
    <>
      <StyledTableRow key={row.id}>
        {/* sx={{ minWidth: 700 }} */}
        <StyledTableCell
          align="left"
          style={{ minWidth: 150, overflowWrap: "break-word" }}
        >
          {row.depYear}
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{ minWidth: 150, overflowWrap: "break-word" }}
        >
          {/* {row.depRate == null ? "-" : row.depRate} */}
          <StyledInput
            size="small"
            type="number"
            disabled={updatingItRate}
            value={userInputValue}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserInputValue(+event.target.value);
            }}
            sx={{ padding: 0, minWidth: 10 }}
          ></StyledInput>
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{ minWidth: 150, overflowWrap: "break-word" }}
        >
          <Button
            sx={{ padding: 0, paddingX: 2 }}
            onClick={() => {
              updateRates();
            }}
            variant="contained"
            disabled={userInputValue == initialValue || updatingItRate}
          >
            {updatingItRate ? "Updating" : "Update"}
          </Button>
        </StyledTableCell>
        <StyledTableCell
          align="center"
          style={{ minWidth: 150, overflowWrap: "break-word" }}
        >
          {initialValue == null
            ? "Not Updated"
            : new Date(recentUpdate!).toLocaleDateString()}
          {initialValue != null && (
            <span className="ml-2">
              {`${new Date(recentUpdate!).getHours()}:${new Date(
                recentUpdate!
              ).getMinutes()}:${new Date(recentUpdate!).getSeconds()}`}
            </span>
          )}
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
}

export default RatesItRow;
