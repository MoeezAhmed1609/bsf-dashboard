import React, { useState } from "react";

// Redux Toolkit Import
import { useDispatch } from "react-redux";

// Redux Actions Import
import { updateUnpaidSupplementSalesReceipt } from "../redux/actions/supplementActions";

// PropTypes Import
import PropTypes from "prop-types";

// Material UI Components Import
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Tooltip,
} from "@mui/material";

// Material UI Icons Import
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Components Import
import StatusMenu from "./StatusMenu";

export default function LedgerTable({ ledger }) {
  const dispatch = useDispatch();
  const rows = [];
  ledger?.map((data) => {
    const totalAmount =
      data?.sales?.sale?.amountPaid + data?.sales?.sale?.amountBalance;
    let rowData = {
      date: data?.sales?.sale?.date,
      category: data?.sales?.sale?.category,
      name: data?.customer,
      totalBalanceAmount: data?.sales?.sale?.amountBalance,
      totalAmount,
      paidAmount: data?.sales?.sale?.amountPaid,
    };
    rows.unshift(rowData);
  });

  const handleReceiptUpdate = (data) => {
    const updateData = {
      saleId: data.id,
      isPaid: data.isPaid,
      amountBalance: data.amountBalance,
      amountPaid: data.amountPaid,
    };

    if (data.category === "Supplement") {
      dispatch(updateUnpaidSupplementSalesReceipt(updateData));
    }
  };

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
          {rows?.map((row) => (
            <TableRow
              key={row.name}
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
                  handleReceiptUpdate={handleReceiptUpdate}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
