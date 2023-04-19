import React, { useState, useEffect, useRef } from "react";

// CSS Import
import "../index.css";

// Redux Toolkit Import
import { useDispatch, useSelector } from "react-redux";

// Redux Actions Import
import {
  createUtils,
  getAllUtils,
  createUtilsSales,
  getUtilsSales,
} from "../redux/actions/utilsActions";

// UUIDV4 import
import { v4 as uuidv4 } from "uuid";

// Material UI Components Import
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  colors,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  IconButton,
} from "@mui/material";

// Material Icons Import
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Component Import
import UtilsSalesTable from "../components/UtilsSalesTable";

// Asset import
import profile from "../assets/profile.webp";

const Utils = () => {
  const dispatch = useDispatch();
  // Getting sales from redux state
  const { utilsData } = useSelector((state) => state.utils);
  const { utilsSalesData } = useSelector((state) => state.utilsSales);

  // Image Uploader
  const [profileImage, setProfileImage] = useState(profile);
  const hiddenFileInput = useRef(null);
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //   Create Utils
  const [name, setName] = useState("");
  const [stock, setStock] = useState(0);
  const handleCreateUtil = () => {
    const data = {
      utils: {
        name,
        stock: Number(stock),
      },
      image: profileImage,
    };
    dispatch(createUtils(data));
    window.location.reload();
  };

  // Create Utility Sales
  const [utility, setUtility] = useState({});
  const [date, setDate] = useState("");
  const [customer, setCustomer] = useState("");
  const [quantity, setQuantity] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [amountBalance, setAmountBalance] = useState(total - amountPaid);
  const [status, setStatus] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getSaleMonth = (dt) => {
    const d = new Date(dt);
    return months[d.getMonth()];
  };
  const getSaleYear = (y) => {
    const d = new Date(y);
    return String(d.getFullYear());
  };

  const saleMonth = getSaleMonth(date);
  const saleYear = getSaleYear(date);

  const handleAddItem = () => {
    const data = {
      id: uuidv4(),
      utility,
      item: utility.name,
      quantity,
      amount,
    };
    setItems((items) => [...items, data]);
    setTotal((total) => (total += Number(data.amount)));
  };
  const handleRemoveReceiptItem = (index) => {
    setItems(items.filter((item) => item.id !== index));
  };

  const handleCreateUtilsSale = () => {
    const data = {
      customer,
      sale: {
        isPaid: status === "Paid" ? true : false,
        date,
        year: saleYear,
        month: saleMonth,
        items,
        amountPaid,
        amountBalance,
      },
    };
    dispatch(createUtilsSales(data));
    window.location.reload();
  };

  // Sales Record
  
  const getCurrentMonth = () => {
    const d = new Date();
    return months[d.getMonth()];
  };
  const currentMonth = getCurrentMonth();
  const [month, setMonth] = useState(currentMonth);
  const selectedMonthSales = [];

  utilsSalesData?.utilsSales?.filter((data) => {
    if (data?.sale?.month === month && data?.sale?.isPaid === true) {
      selectedMonthSales.unshift(data);
    }
  });

  useEffect(() => {
    dispatch(getAllUtils());
    dispatch(getUtilsSales());
  }, [dispatch]);
  return (
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
        <Typography variant="h5">Utility Sales Records</Typography>
      </Box>
      <Box
        sx={{
          height: "100%",
          width: { xs: "90%", sm: "76%", md: "74%" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: "200px",
              border: `2px solid ${colors.lightGreen[700]}`,
              marginTop: "20px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <Grid container sx={{ height: "100%", width: "100%" }}>
              <Grid item xs={12} sx={{ height: "70px" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    paddingLeft: "15px",
                    borderBottom: `2px solid ${colors.lightGreen[700]}`,
                    width: "98%",
                  }}
                >
                  Create Utility Sale Receipt
                </Typography>
              </Grid>
              <Grid item sx={{ minHeight: "160px", width: "100%" }} xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    padding: "15px 0",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <input
                        type="date"
                        style={{ width: "100%" }}
                        className="datePicker"
                        onChange={(event) => setDate(event.target.value)}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Customer"
                        name="description"
                        sx={{ width: "100%" }}
                        color="success"
                        onChange={(e) => setCustomer(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel
                          id="demo-simple-select-label"
                          color="success"
                        >
                          Utility
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={utility}
                          label="Utility"
                          color="success"
                          onChange={(e) => setUtility(e.target.value)}
                          sx={{ display: "flex" }}
                        >
                          {utilsData &&
                            utilsData?.utils?.map((util) => (
                              <MenuItem value={util} key={util}>
                                <Box
                                  sx={{
                                    height: "60px",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <img
                                    src={util?.image?.url}
                                    style={{ height: "50px" }}
                                    alt="Util"
                                  />
                                  <Typography
                                    variant="body1"
                                    sx={{ marginLeft: "15px" }}
                                  >
                                    {util?.name}
                                  </Typography>
                                </Box>
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Quantity"
                        name="description"
                        sx={{ width: "100%" }}
                        color="success"
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Amount"
                        name="description"
                        sx={{ width: "100%" }}
                        color="success"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100px",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{ width: "330px" }}
                        color="success"
                        onClick={handleAddItem}
                      >
                        Add Item
                      </Button>
                    </Grid>
                    <Grid
                      sx={{ minHeight: "200px", width: "100%" }}
                      item
                      xs={12}
                    >
                      <TableContainer
                        sx={{
                          minHeight: "180px",
                          width: "100%",
                        }}
                      >
                        <Table aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell sx={{ width: "50px" }}></TableCell>
                              <TableCell sx={{ width: "400px" }}>
                                Item
                              </TableCell>
                              <TableCell align="right">Quantity</TableCell>
                              <TableCell align="right">Amount</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {items?.length > 0 ? (
                              items?.map((item, index) => (
                                <TableRow
                                  key={index}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell sx={{ width: "50px" }}>
                                    <Tooltip title="Remove">
                                      <IconButton
                                        aria-label="remove"
                                        onClick={() =>
                                          handleRemoveReceiptItem(item.id)
                                        }
                                      >
                                        <HighlightOffIcon color="error" />
                                      </IconButton>
                                    </Tooltip>
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {item?.utility?.name}
                                  </TableCell>
                                  <TableCell align="right">
                                    {item?.quantity}
                                  </TableCell>
                                  <TableCell align="right">
                                    {item?.amount}
                                  </TableCell>
                                </TableRow>
                              ))
                            ) : (
                              <Box sx={{ width: "100%", textAlign: "center" }}>
                                <Typography variant="h6">No Items</Typography>
                              </Box>
                            )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
              <Grid item sx={{ minHeight: "100px", width: "100%" }} xs={12}>
                <Box sx={{ width: "100%", padding: "30px 0" }}>
                  <Grid container>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={total}
                        label="Total"
                        sx={{ width: "94%" }}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Amount Paid"
                        sx={{ width: "94%" }}
                        color="success"
                        onChange={(e) => setAmountPaid(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        id="outlined-error-helper-text"
                        InputProps={{
                          readOnly: true,
                        }}
                        value={total - amountPaid}
                        label="Balance Amount"
                        sx={{ width: "94%" }}
                        color="success"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          color="success"
                        >
                          Status
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Status"
                          color="success"
                          onChange={(e) => setStatus(e.target.value)}
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
                        height: "80px",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        sx={{ width: "330px" }}
                        color="success"
                        onClick={handleCreateUtilsSale}
                      >
                        Create Sale
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: "300px",
              border: `2px solid ${colors.lightGreen[700]}`,
              marginTop: "20px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <Grid container sx={{ height: "100%", width: "100%" }}>
              <Grid
                item
                xs={12}
                sx={{
                  height: "70px",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    paddingLeft: "15px",
                    borderBottom: `2px solid ${colors.lightGreen[700]}`,
                    width: "98%",
                  }}
                >
                  Sales Records
                </Typography>
              </Grid>
              <Grid item sx={{ minHeight: "300px", width: "100%" }} xs={12}>
                <Box sx={{ width: "100%", padding: "15px 0" }}>
                  <Grid
                    container
                    sx={{
                      justifyContent: "center",
                      gap: "15px 0px",
                    }}
                  >
                    <Grid item xs={12} sm={8}>
                      <FormControl sx={{ width: "100%" }}>
                        <InputLabel
                          id="demo-simple-select-label"
                          color="success"
                        >
                          Month
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={month}
                          label="Month"
                          color="success"
                          onChange={(e) => setMonth(e.target.value)}
                          sx={{ display: "flex" }}
                        >
                          {months?.map((month, index) => (
                            <MenuItem value={month} key={index}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      {selectedMonthSales.length > 0 ? (
                      <UtilsSalesTable data={selectedMonthSales} />
                      ) : (
                        <Box sx={{height: "100px" , display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                          <Typography variant="h6">No Sales!</Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              minHeight: "300px",
              border: `2px solid ${colors.lightGreen[700]}`,
              marginTop: "20px",
              borderRadius: "20px",
              padding: "15px",
            }}
          >
            <Grid container sx={{ height: "100%", width: "100%" }}>
              <Grid
                item
                xs={12}
                sx={{
                  height: "70px",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    paddingLeft: "15px",
                    borderBottom: `2px solid ${colors.lightGreen[700]}`,
                    width: "98%",
                  }}
                >
                  Create Utility
                </Typography>
              </Grid>
              <Grid item sx={{ minHeight: "160px", width: "100%" }} xs={12}>
                <Box sx={{ width: "100%", padding: "15px 0" }}>
                  <Grid
                    container
                    sx={{
                      justifyContent: "center",
                      gap: "15px 0px",
                    }}
                  >
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Name"
                        sx={{ width: "94%" }}
                        color="success"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="outlined-error-helper-text"
                        label="Stock"
                        sx={{ width: "94%" }}
                        color="success"
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        height: "100px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={profileImage}
                        style={{ height: "100px" }}
                        alt="profile"
                      />
                      <Button
                        onClick={handleClick}
                        variant="contained"
                        color="success"
                        sx={{ marginLeft: "30px" }}
                      >
                        Upload a file
                      </Button>
                      <input
                        type="file"
                        ref={hiddenFileInput}
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ textAlign: "center", marginTop: "15px" }}
                    >
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ width: "65%" }}
                        onClick={handleCreateUtil}
                      >
                        Create
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Utils;
