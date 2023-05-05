import React, { useState, useEffect, useRef } from "react";

// Redux Toolkit Import
import { useSelector, useDispatch } from "react-redux";

// Import React To Print
import { useReactToPrint } from "react-to-print";

// Datejs Import
import "datejs";

// Redux Actions Import
import {
  getClientDetails,
  updateClientFees,
  updateClientStatus,
} from "../redux/actions/clientActions";

// React Router Dom Import
import { useParams } from "react-router-dom";

// Asset Import
import logo from "../assets/BEING.png";

// Material UI components
import {
  Box,
  colors,
  Grid,
  Typography,
  Button,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

// Material Icons
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ClientProfile = () => {
  const dispatch = useDispatch();
  // Getting sales from redux state
  const { client } = useSelector((state) => state.clientDetail);
  const profile = client?.client;
  const [paidDate, setPaidDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("");

  let clientBalance = 0;
  clientBalance += Number(client?.client?.isAdmissionFeePaid?.amountBalance);
  client?.client?.fees?.filter((fee) => {
    clientBalance += Number(fee?.balanceAmount);
  });

  const feeDate = Date.parse(client?.client?.feeReminder)
    ?.addDays(3)
    ?.toString("yyyy-MM-d");

  const data = [
    {
      title: "Admission Date",
      value: profile?.date,
    },
    {
      title: "Height",
      value: profile?.height,
    },
    {
      title: "Weight",
      value: profile?.weight,
    },
    {
      title: "Goal Weight",
      value: profile?.goalWeight,
    },
    {
      title: "Life Status",
      value: profile?.lifeStatus,
    },
    {
      title: "Residential Address",
      value: profile?.address,
    },
    {
      title: "Phone",
      value: profile?.phone,
    },
    {
      title: "Mobile",
      value: profile?.mobile,
    },
    {
      title: "Email",
      value: profile?.email,
    },
    {
      title: "CNIC",
      value: profile?.cnic,
    },
    {
      title: "Guardian Name",
      value: profile?.guardian?.name,
    },
    {
      title: "Guardian Phone",
      value: profile?.guardian?.phone,
    },
    {
      title: "Guardian Relation",
      value: profile?.guardian?.relation,
    },
    {
      title: "Need Trainer?",
      value: profile?.trainer,
    },
    {
      title: "Have been gym before?",
      value: profile?.gymBefore,
    },
    {
      title: "Physical Problem",
      value: profile?.problem,
    },
    {
      title: "Admission Fee Paid",
      value: profile?.isAdmissionFeePaid?.amount,
    },
  ];

  const params = useParams();

  // Change Status
  const handleChangeStatus = async () => {
    let status = profile?.status === "Active" ? "Non Active" : "Active";
    let data = {
      id: profile?._id,
      status,
    };
    new Promise((resolve, reject) => {
      resolve(dispatch(updateClientStatus(data)));
    }).then(() => window.location.reload());
  };

  const length = profile?.fees?.length;
  const fee = Date.parse(profile?.fees[length - 1]?.feeDate)?.toString(
    "yyyy-MM-d"
  );

  const feeReminder = Date.parse(fee)
    ?.addMonths(2)
    ?.addDays(-3)
    ?.toString("yyyy-MM-d");

  // Create Client & Print Summary

  const print = useRef();
  const receiptPrint = useRef();

  const generateProfilePrint = useReactToPrint({
    content: () => print.current,
    documentTitle: `${profile?.name} Profile`,
    onAfterPrint: () => alert("Profile Printed Successfully!"),
  });
  const generateReceiptPrint = useReactToPrint({
    content: () => receiptPrint.current,
    documentTitle: `${profile?.name} Fee receipt`,
    onAfterPrint: () => alert("Receipt Printed Successfully!"),
  });

  // Create Receipt
  const [receipt, setReceipt] = useState(false);

  // Handle Fee Payment
  const handleFeePayment = () => {
    const balanceAmount = amount - paidAmount;
    const length = profile?.fees?.length;

    const feeReminder =
      profile?.fees?.length > 0
        ? Date.parse(fee).addMonths(2).addDays(-3).toString("yyyy-MM-d")
        : Date.parse(profile?.date)
            .addMonths(1)
            .addDays(-3)
            .toString("yyyy-MM-d");

    const feeDate =
      profile?.fees?.length > 0
        ? Date.parse(profile?.fees[length - 1]?.feeDate)
            .addMonths(1)
            .toString("yyyy-MM-dd")
        : profile?.date;

    const updateFeeData = {
      status,
      feeDate,
      paidDate,
      amount,
      paidAmount,
      balanceAmount,
      method: paymentMethod,
    };
    const data = {
      id: profile?._id,
      updateFeeData,
      feeReminder,
      lastFeePaidDate: paidDate,
    };

    new Promise((resolve, reject) => {
      resolve(dispatch(updateClientFees(data)), generateReceiptPrint());
    }).then(() => window.location.reload());
  };

  useEffect(() => {
    dispatch(getClientDetails(params.id));
  }, [dispatch, params.id]);

  return (
    <Box
      sx={{
        padding: "80px 0 80px 65px",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          minHeight: "500px",
          width: { xs: "90%", sm: "80%", md: "70%" },
          display: "flex",
          mt: 5,
          border: `2px solid ${colors.lightGreen[700]}`,
          borderRadius: "20px",
          padding: {
            xs: "8px",
            sm: "18px",
            md: "25px",
          },
        }}
      >
        <Grid ref={print} container sx={{ height: "auto" }}>
          <Grid
            item
            xs={12}
            sm={4}
            md={3}
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                height: "200px",
                width: {
                  xs: "60%",
                  sm: "97%",
                },

                border: `2px solid ${colors.lightGreen[700]}`,
                backgroundImage: `url(${profile?.profile?.url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={7}
            md={5}
            sx={{
              width: "80%",
              minHeight: "180px",
              display: "flex",
              flexDirection: "column",
              marginLeft: "25px",
              marginTop: {
                xs: "15px",
                sm: "0",
              },
            }}
          >
            <Typography variant="h3">{profile?.name}</Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", paddingLeft: "10px" }}
            >
              {profile?.gender}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", paddingLeft: "10px" }}
            >
              {profile?.age}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", paddingLeft: "10px" }}
            >
              {profile?.marital}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontWeight: "normal", paddingLeft: "10px" }}
            >
              {profile?.package}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={3}
            sx={{
              display: "flex",
              minHeight: "100px",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                height: "40px",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <span
                style={{
                  height: "10px",
                  width: "10px",
                  borderRadius: "100%",
                  backgroundColor:
                    profile?.status === "Active" ? "green" : "red",
                  marginRight: "10px",
                }}
              ></span>
              <Typography variant="subtitle1">{profile?.status}</Typography>
              <Button
                variant="contained"
                color="success"
                size="small"
                sx={{ marginLeft: "10px" }}
                onClick={handleChangeStatus}
              >
                {profile?.status === "Active" ? "Non Active" : "Active"}
              </Button>
            </Box>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{
                marginBottom: "20px",
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                },
              }}
              onClick={generateProfilePrint}
            >
              Print Profile
            </Button>
            <Box sx={{ display: "flex" }}>
              <Typography variant="subtitle1">Balance : </Typography>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", paddingLeft: "8px" }}
              >
                {clientBalance}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sx={{ margin: "20px 0" }}>
            <Typography
              variant="h6"
              sx={{
                borderBottom: `2px solid ${colors.lightGreen[700]}`,
              }}
            >
              Client Information
            </Typography>
          </Grid>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "50%" }} align="center">
                    Title
                  </TableCell>
                  <TableCell sx={{ width: "50%" }} align="center">
                    Information
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((client, index) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={index}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {client.title}
                    </TableCell>
                    <TableCell align="center">{client.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item xs={12} sx={{ margin: "20px 0" }}>
            <Typography
              variant="h6"
              sx={{
                borderBottom: `2px solid ${colors.lightGreen[700]}`,
              }}
            >
              Fees Details
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ marginBottom: "20px" }}></Grid>
          <TableContainer>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "60px" }}>Month</TableCell>
                  <TableCell align="right">Fee Date</TableCell>
                  <TableCell align="right">Paid Date</TableCell>
                  <TableCell align="right">Paid Amount</TableCell>
                  <TableCell align="right">Balance</TableCell>
                  <TableCell sx={{ width: "60px" }}>Method</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {profile?.fees?.map((fee) => (
                  <TableRow
                    key={fee._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {fee?.month}
                    </TableCell>
                    <TableCell align="right">{fee?.feeDate}</TableCell>
                    <TableCell align="right">{fee?.paidDate}</TableCell>
                    <TableCell align="right">{fee?.paidAmount}</TableCell>
                    <TableCell align="right">{fee?.balanceAmount}</TableCell>
                    <TableCell align="right">{fee?.method}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Box>
      <Grid
        container
        sx={{
          height: "100%",
          width: { xs: "96%", sm: "88%", md: "80%" },
          marginTop: "40px",
        }}
      >
        <Grid item sx={{ height: "220px", width: "100%" }} xs={12}>
          <Box
            sx={{
              width: "100%",
              padding: "10px 0",
            }}
          >
            <Typography variant="subtitle2">
              Add new fees payment for this client!
            </Typography>
            <Grid container>
              <Grid
                item
                xs={12}
                sm={2}
                sx={{ marginTop: { xs: "15px", sm: "0" } }}
              >
                <input
                  type="date"
                  className="datePicker"
                  onChange={(e) => setPaidDate(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ marginTop: { xs: "15px", sm: "0" } }}
              >
                <TextField
                  id="outlined-error-helper-text"
                  label="Amount"
                  color="success"
                  sx={{ width: "94%" }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{ marginTop: { xs: "15px", sm: "0" } }}
              >
                <TextField
                  id="outlined-error-helper-text"
                  label="Paid Amount"
                  color="success"
                  sx={{ width: "94%" }}
                  onChange={(e) => setPaidAmount(e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                sx={{ marginTop: { xs: "15px", sm: "0" } }}
              >
                <FormControl sx={{ width: "94%" }}>
                  <InputLabel id="demo-simple-select-label" color="success">
                    Method
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={paymentMethod}
                    label="Method"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    color="success"
                  >
                    <MenuItem value={"Cash"}>Cash</MenuItem>
                    <MenuItem value={"Online"}>Online</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sm={2}
                sx={{ marginTop: { xs: "15px", sm: "0" } }}
              >
                <FormControl sx={{ width: "94%" }}>
                  <InputLabel id="demo-simple-select-label" color="success">
                    Status
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={status}
                    label="Status"
                    onChange={(e) => setStatus(e.target.value)}
                    color="success"
                  >
                    <MenuItem value={"Paid"}>Paid</MenuItem>
                    <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  height: "100px",
                  alignItems: "center",
                  marginTop: { xs: "15px", sm: "0" },
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: "330px" }}
                  color="success"
                  disabled={!paidDate || !paidAmount || !amount || !status}
                  onClick={() => setReceipt(true)}
                >
                  Create Receipt
                </Button>
              </Grid>
              {receipt && (
                <>
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
                      ref={receiptPrint}
                      sx={{
                        height: "400px",
                        width: "500px",
                        border: `2px solid ${colors.lightGreen[700]}`,
                        borderRadius: "20px",
                        padding: "16px",
                      }}
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
                            width: "115px",
                            background: `${colors.lightGreen[700]}`,
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="subtitle1">
                            FEE RECEIPT
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ marginTop: "6px" }}>
                          Plot # 76/20 Sec. 5G near Summit Bank, Saeedabad,
                          Baldia Town, Karachi
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
                          Fee Date:{" "}
                          <span
                            style={{
                              padding: "0 12px",
                              borderBottom: "1px solid black",
                              fontWeight: "bold",
                            }}
                          >
                            {feeDate}
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
                            {paidDate}
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
                              padding: "0 12px",
                              borderBottom: "1px solid black",
                              fontWeight: "bold",
                              minWidth: "240px",
                            }}
                          >
                            {profile?.name}
                          </span>
                        </Typography>
                        <Typography variant="body2" sx={{ marginLeft: "5px" }}>
                          Mobile:{" "}
                          <span
                            style={{
                              padding: "0 12px",
                              borderBottom: "1px solid black",
                              fontWeight: "bold",
                            }}
                          >
                            {profile?.mobile}
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
                            {amount}
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
                            {paidAmount}
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
                            {amount - paidAmount}
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
                            {paymentMethod}
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
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      height: "100px",
                      alignItems: "center",
                      marginTop: { xs: "15px", sm: "0" },
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ width: "330px" }}
                      color="success"
                      disabled=""
                      onClick={handleFeePayment}
                    >
                      Add & Print Fee Receipt
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClientProfile;
