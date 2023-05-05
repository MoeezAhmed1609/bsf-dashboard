import React, { useState, useRef } from "react";

// Redux Toolkit Import
import { useDispatch } from "react-redux";

// Redux Actions Import
import { updateUnpaidSupplementSalesReceipt } from "../redux/actions/supplementActions";
import { updateUnpaidUtilsSalesReceipt } from "../redux/actions/utilsActions";
import {
  updateClientAdmission,
  updateClientFeesLedger,
} from "../redux/actions/clientActions";

// Redux Toolkit Import
import { useSelector } from "react-redux";

// Import React To Print
import { useReactToPrint } from "react-to-print";

// Material UI Import
import {
  Box,
  Typography,
  colors,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  Grid,
  Button,
} from "@mui/material";

// Components Import
import LedgerTable from "../components/LedgerTable";

// Asset Import
import logo from "../assets/BEING.png";

// Material Icons
import SearchIcon from "@mui/icons-material/Search";

const Ledger = () => {
  // Getting sales from redux state
  const { supplementsSalesData } = useSelector(
    (state) => state.supplementsSales
  );
  const { utilsSalesData } = useSelector((state) => state.utilsSales);

  const { clientsData } = useSelector((state) => state.clients);

  // React States
  const ledger = [];

  const [query, setQuery] = useState("");

  supplementsSalesData?.supplementSales?.map((sales) => {
    if (sales?.sale?.isPaid === false) {
      ledger.push({
        customer: sales?.customer,
        sales,
      });
    }
  });
  utilsSalesData?.utilsSales?.filter((data) => {
    if (data?.sale?.isPaid === false) {
      ledger.push({
        customer: data?.customer,
        sales: data,
      });
    }
  });

  // Admission and fees ledger
  const admissionLedger = [];
  const feesLedger = [];
  clientsData?.clients?.filter((client) => {
    if (client?.isAdmissionFeePaid?.status === "Unpaid") {
      admissionLedger.push(client);
    }
    client?.fees?.filter((fee) => {
      if (fee?.status === "Unpaid") {
        const data = {
          id: client?._id,
          feesId: fee?._id,
          date: client?.date,
          category: "Fees",
          name: client?.name,
          mobile: client?.mobile,
          totalBalanceAmount: fee?.balanceAmount,
          totalAmount: fee?.amount,
          paidAmount: fee?.paidAmount,
        };
        feesLedger.push(data);
      }
    });
  });

  const dispatch = useDispatch();
  const rows = [];
  ledger.map((data) => {
    const totalAmount =
      data?.sales?.sale?.amountPaid + data?.sales?.sale?.amountBalance;
    let rowData = {
      id: data?.sales?._id,
      date: data?.sales?.sale?.date,
      category: data?.sales?.sale?.category,
      name: data?.customer,
      totalBalanceAmount: data?.sales?.sale?.amountBalance,
      totalAmount,
      paidAmount: data?.sales?.sale?.amountPaid,
    };
    rows.unshift(rowData);
  });

  admissionLedger?.filter((item) => {
    let rowData = {
      id: item?._id,
      date: item?.date,
      category: "Admission",
      name: item?.name,
      mobile: item?.mobile,
      totalBalanceAmount: item?.isAdmissionFeePaid?.amountBalance,
      totalAmount: item?.isAdmissionFeePaid?.amount,
      paidAmount: item?.isAdmissionFeePaid?.amountPaid,
    };
    rows.unshift(rowData);
  });
  feesLedger.filter((fee) => rows.unshift(fee));

  const handleReceiptUpdate = (data) => {
    const updateData = {
      saleId: data.id,
      isPaid: data.isPaid,
      amountBalance: data.amountBalance,
      amountPaid: data.amountPaid,
    };

    if (data.category === "Supplement") {
      dispatch(updateUnpaidSupplementSalesReceipt(updateData));
      generateReceiptPrint();
    }
    if (data.category === "Gym Products") {
      dispatch(updateUnpaidUtilsSalesReceipt(updateData));
      generateReceiptPrint();
    }
    const admissionData = {
      id: data?.id,
      isAdmissionFeePaid: {
        status: data?.isPaid === true ? "Paid" : "Unpaid",
        amountBalance: String(data.amountBalance),
        amountPaid: String(data.amountPaid),
        amount: data.total,
        method: data?.method,
      },
    };
    if (data.category === "Admission") {
      dispatch(updateClientAdmission(admissionData));
      generateReceiptPrint();
    }

    const feesData = {
      feesId: data?.feesId,
      status: data?.isPaid === true ? "Paid" : "Unpaid",
      paidDate: data?.paidDate,
      paidAmount: data?.amountPaid,
      balanceAmount: data?.amountBalance,
      method: data?.method,
    };
    if (data.category === "Fees") {
      dispatch(updateClientFeesLedger(feesData));
      generateReceiptPrint();
    }
  };

  // For ledger Receipt
  const [feeReceipt, setFeeReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState({});
  console.log(receiptData);
  const receiptPrint = useRef();
  const generateReceiptPrint = useReactToPrint({
    content: () => receiptPrint.current,
    documentTitle: `Ledger Fee receipt`,
    onAfterPrint: () => alert("Receipt Printed Successfully!"),
  });

  return (
    <>
      <Box
        sx={{
          padding: "80px 0 80px 65px",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            height: "74px",
            width: "88%",
            display: "flex",
            alignItems: "center",
            paddingLeft: { xs: "10px", sm: "20px", md: "30px" },
            paddingTop: { xs: "10px", sm: "20px", md: "30px" },
            borderBottom: `2px solid ${colors.lightGreen[700]}`,
          }}
        >
          <Typography variant="h5">Ledger</Typography>
        </Box>
        <Box
          sx={{
            height: "100px",
            width: "70%",
            border: `2px solid ${colors.lightGreen[700]}`,
            marginTop: "30px",
            borderRadius: "20px",
            padding: {
              xs: "20px 14px",
              sm: "20px",
            },
          }}
        >
          <FormControl sx={{ m: 1, width: "100%" }}>
            <Input
              id="standard-adornment-password"
              color="success"
              type="text"
              onChange={(c) => setQuery(c.target.value)}
              placeholder="Search client by name..."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick=""
                    onMouseDown=""
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box
          sx={{
            minHeight: "65vh",
            width: "90%",
            border: `2px solid ${colors.lightGreen[700]}`,
            marginTop: "30px",
            borderRadius: "20px",
            padding: {
              xs: "20px 14px",
              sm: "20px",
            },
          }}
        >
          <LedgerTable
            query={query}
            rows={rows}
            admissionLedger={admissionLedger}
            feesLedger={feesLedger}
            setFeeReceipt={setFeeReceipt}
            setReceiptData={setReceiptData}
          />
        </Box>
        {feeReceipt && (
          <Grid container sx={{ marginTop: "20px" }}>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: { xs: "15px", sm: "0" },
              }}
            >
              <Box
                sx={{
                  height: "400px",
                  width: "480px",
                  border: `2px solid ${colors.lightGreen[700]}`,
                  borderRadius: "20px",
                  padding: "16px",
                }}
                ref={receiptPrint}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{ width: "200px", marginBottom: "6px" }}
                  />
                  <Box
                    sx={{
                      border: `1.5px solid black`,
                      height: "30px",
                      width: "145px",
                      background: `${colors.lightGreen[700]}`,
                      textAlign: "center",
                    }}
                  >
                    <Typography variant="subtitle1">LEDGER RECEIPT</Typography>
                  </Box>
                  <Typography variant="body2" sx={{ marginTop: "6px" }}>
                    Plot # 76/20 Sec. 5G near Summit Bank, Saeedabad, Baldia
                    Town, Karachi
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "10px",
                  }}
                >
                  <Typography variant="body2">
                    Ledger Date:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.date}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Paid Date:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.paidDate}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Typography variant="body2">
                    Client:{" "}
                    <span
                      style={{
                        padding: "0 18px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                        minWidth: "240px",
                      }}
                    >
                      {receiptData?.client}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Category:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.category}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Typography variant="body2">
                    Amount:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.amount}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Paid:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.paid}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Balance:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.balance}
                    </span>
                  </Typography>
                  <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                    Method:{" "}
                    <span
                      style={{
                        padding: "0 12px",
                        borderBottom: "1px solid black",
                        fontWeight: "bold",
                      }}
                    >
                      {receiptData?.method}
                    </span>
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <Box sx={{ width: "60%" }}>
                    <Typography
                      sx={{
                        textDecoration: "underline",
                        fontWeight: "bold",
                      }}
                      variant="body2"
                    >
                      NOTE:
                    </Typography>
                    <ul style={{ fontSize: "10px", paddingLeft: "10px" }}>
                      <li>
                        If you will be absent for long 3 months then your
                        membership will be Cancelled.
                      </li>
                      <li>Gym will be closed on Sunday.</li>
                      <li>Admission / Monthly fee is not refundable.</li>
                    </ul>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: "140px",
                        borderBottom: "1.5px solid black",
                        height: "70px",
                      }}
                    ></Box>
                    <Typography variant="body2">Signature</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sx={{ margin: "15px 0", textAlign: "center" }}>
              <Button
                color="success"
                variant="contained"
                sx={{ width: "280px" }}
                onClick={() => {
                  handleReceiptUpdate({
                    id: receiptData?.id,
                    category: receiptData?.category,
                    isPaid: receiptData?.status === "Paid" ? true : false,
                    amountBalance: receiptData?.balance,
                    amountPaid: receiptData?.paid,
                    total: receiptData?.amount,
                    paidDate: receiptData?.paidDate,
                    method: receiptData?.method,
                    feesId: receiptData?.feesId,
                  });
                }}
              >
                Submit & Print
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </>
  );
};

export default Ledger;
