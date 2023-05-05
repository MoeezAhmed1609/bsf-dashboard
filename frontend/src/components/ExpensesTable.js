import React, { useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import { Box, Button, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

// Redux Toolkit Import
import { useSelector, useDispatch } from "react-redux";

import { getExpenses, deleteExpense } from "../redux/actions/expenseActions";

// Import React To Print
import { useReactToPrint } from "react-to-print";

const columns = [
  { label: "", width: 50, align: "center" },
  { label: "ID", width: 80, align: "center" },
  { label: "Date", width: 110, align: "left" },
  {
    id: "quantity",
    label: "Expense",
    width: 200,
    align: "left",
  },
  {
    id: "rate",
    label: "Paid Amount",
    width: 100,
    align: "right",
  },
];

export default function ExpensesTable(props) {
  const dispatch = useDispatch();
  // Getting expenses from redux state
  const { expensesData } = useSelector((state) => state.expenses);

  // Get Data According to mode
  const data = [];

  expensesData?.expenses?.filter((expense) => {
    data.unshift(expense);
  });

  // Print Summary

  const print = useRef();

  const generatePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: "dashboardPrint",
    onAfterPrint: () => alert("Receipt Printed Successfully!"),
  });

  const handlePrint = () => {
    generatePrint();
  };
  const handleDeleteExpense = (id) => {
    dispatch(deleteExpense(id));
    alert("Deleted!");
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <>
      {data?.length > 0 ? (
        <>
          <TableContainer ref={print}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ maxWidth: column.width, overflow: "hidden" }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((expense, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={expense._id}
                    >
                      <TableCell align="center">
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDeleteExpense(expense._id)}
                          >
                            <DeleteIcon color="error" fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>{expense.date}</TableCell>
                      <TableCell>{expense.expense.description}</TableCell>
                      <TableCell align="right">
                        {expense.expense.amountPaid}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              sx={{ width: "330px" }}
              onClick={handlePrint}
              color="success"
            >
              Print
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ width: "100%", textAlign: "center" }}>
          <Typography variant="h6">No Record!</Typography>
        </Box>
      )}
    </>
  );
}
