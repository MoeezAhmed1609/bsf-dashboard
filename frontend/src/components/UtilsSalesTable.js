import React, { useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, Box, Button, Tooltip, IconButton } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

// Import React To Print
import { useReactToPrint } from "react-to-print";

// Redux Actions Import
import { deleteSupplementSales } from "../redux/actions/supplementActions";
import { useDispatch } from "react-redux";

export default function UtilsSalesTable({ data, deleteSales }) {
  console.log(data)
  const dispatch = useDispatch();

  let total = 0;
  data?.map((row) => {
    total += row?.sale?.amountPaid;
  });

  // Print Summary

  const print = useRef();

  const generatePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: `${data[0]?.sale?.month} Utility Sales Print`,
    onAfterPrint: () => alert("Summary Printed Successfully!"),
  });

  return (
    <>
      <TableContainer ref={print} sx={{ maxHeight: "500px" }}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "60px" }}></TableCell>
              <TableCell sx={{ width: "150px" }}>Customer</TableCell>
              <TableCell sx={{ minWidth: "230px" }}>Items</TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row) => (
              <TableRow key={row?._id}>
                <TableCell align="center">
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={() => deleteSales(data)}
                    >
                      <DeleteIcon color="error" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{row?.customer}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: "5px" }}>
                    {row?.sale?.items?.map((item) => (
                      <Typography variant="body1">
                        {item?.item} ({item?.quantity} ,{" "}
                        <span style={{ fontSize: "10px" }}>RS.</span>
                        {item?.amount})
                      </Typography>
                    ))}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <span style={{ fontSize: "10px" }}>RS.</span>
                  {row?.sale?.amountPaid}
                </TableCell>
              </TableRow>
            ))}

            <TableRow>
              <TableCell rowSpan={2} />
              <TableCell colSpan={1} align="right">
                Total Sales
              </TableCell>
              <TableCell align="right">
                <span style={{ fontSize: "10px" }}>RS.</span>
                {total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          color="success"
          sx={{ width: "65%" }}
          onClick={generatePrint}
        >
          Print
        </Button>
      </Box>
    </>
  );
}
