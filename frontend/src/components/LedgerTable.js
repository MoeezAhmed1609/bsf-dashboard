import React from "react";

// Material UI Components Import
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Components Import
import StatusMenu from "./StatusMenu";

export default function LedgerTable({
  ledger,
  query,
  admissionLedger,
  feesLedger,
  setFeeReceipt,
  setReceiptData,
  rows
}) {
 

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell align="right">Balance Amount</TableCell>
            <TableCell align="right">Paid Amount</TableCell>
            <TableCell align="right">Total Amount</TableCell>
            <TableCell sx={{ width: "100px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            ?.filter((item) =>
              item?.name.toLowerCase().includes(query.toLowerCase())
            )
            .map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.date}
                </TableCell>
                <TableCell>{row?.category}</TableCell>
                <TableCell>{row?.name}</TableCell>
                <TableCell align="right">{row?.totalBalanceAmount}</TableCell>
                <TableCell align="right">{row?.paidAmount}</TableCell>
                <TableCell align="right">{row?.totalAmount}</TableCell>
                <TableCell align="right">
                  <StatusMenu
                    receipt={row}
                    setFeeReceipt={setFeeReceipt}
                    setReceiptData={setReceiptData}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
