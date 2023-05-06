import React, { useState } from "react";

// Datejs Import
import "datejs";

// Redux Toolkit Import
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

// Material UI components
import {
  Box,
  Typography,
  colors,
  Alert,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Components Import
import LineChart from "../components/LineChart";

const Dashboard = () => {
  // Getting sales from redux state
  const { clientsData } = useSelector((state) => state.clients);
  // Getting expenses from redux state
  const { expensesData } = useSelector((state) => state.expenses);
  const { supplementsSalesData } = useSelector(
    (state) => state.supplementsSales
  );
  const { supplementsData } = useSelector((state) => state.supplements);
  const { utilsSalesData } = useSelector((state) => state.utilsSales);
  const { utilsData } = useSelector((state) => state.utils);

  // Total Sales Calculation

  const getMonthName = () => {
    const monthNames = [
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

    const d = Date.today();
    return monthNames[d.getMonth()];
  };

  const currentMonth = getMonthName();

  const [month, setMonth] = useState(currentMonth);

  // Line Chart Calculations
  const monthNames = [
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
  const feesLineData = [];
  let totalMonthFees = 0;
  let totalMonthExpenses = 0;
  let totalMonthUtilsSales = 0;
  let totalMonthSupplementSales = 0;
  let totalLedger = 0;
  clientsData?.clients?.map((client) => {
    client?.fees?.map((fee) => {
      if (fee?.month === month) {
        totalMonthFees += Number(fee?.paidAmount);
      }
      if (fee?.month === month && fee?.status === "Unpaid") {
        totalLedger += Number(fee?.balanceAmount);
      }
    });
  });
  expensesData?.expenses?.map((expense) => {
    if (expense?.expense?.month === month) {
      totalMonthExpenses += expense?.expense?.amountPaid;
    }
  });
  utilsSalesData?.utilsSales?.map((sales) => {
    if (sales?.sale?.month === month) {
      totalMonthUtilsSales += Number(sales?.sale?.amountPaid);
    }
    if (sales?.sale?.month === month && sales?.sale?.isPaid === false) {
      totalLedger += sales?.sale?.amountBalance;
    }
  });
  supplementsSalesData?.supplementSales?.map((sales) => {
    if (sales?.sale?.month === month) {
      totalMonthSupplementSales += Number(sales?.sale?.amountPaid);
    }
    if (sales?.sale?.month === month && sales?.sale?.isPaid === false) {
      totalLedger += sales?.sale?.amountBalance;
    }
  });
  let data = {
    month,
    fees: totalMonthFees,
    expenses: totalMonthExpenses,
    utilsSales: totalMonthUtilsSales,
    supplementsSales: totalMonthSupplementSales,
    ledger: totalLedger,
  };
  feesLineData.push(data);
  let totalMonthSales = totalMonthUtilsSales + totalMonthSupplementSales;
  // Get Fee Reminders
  let reminders = [];
  clientsData?.clients?.filter((client) => {
    let date = Date.today().toString("yyyy-MM-dd");
    if (client?.feeReminder === date && client?.status === "Active") {
      const feeDate = new Date(client?.feeReminder)
        .add({ days: 3 })
        .toString("yyyy-MM-dd");
      let data = {
        client,
        feeDate,
      };
      reminders.unshift(data);
    }
  });
  console.log(reminders)

  // STock Reminders
  const stockReminders = [];
  utilsData?.utils?.filter((data) => {
    if (data?.stock < 6) {
      stockReminders.push(data);
    }
  });

  return (
    <Box
      sx={{
        padding: "90px 0 80px 65px",
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
        <Typography variant="h5">BSF Dashboard</Typography>
      </Box>
      <Box sx={{ width: "100%", marginTop: "20px", padding: "0 6%" }}>
        <Grid
          container
          sx={{
            minHeight: "240px",
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ margin: { xs: "14px", sm: "0" } }}
          >
            <Box
              sx={{
                height: "200px",
                width: "90%",
                background: colors.lightGreen[700],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "20px",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
                Total Sales ({month})
              </Typography>
              <Typography variant="h3" sx={{ color: "white" }}>
                <span
                  style={{
                    color: "white",
                    fontSize: "26px",
                    paddingLeft: "10px",
                  }}
                >
                  RS.
                </span>
                {totalMonthSales}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ margin: { xs: "14px", sm: "0" } }}
          >
            <Box
              sx={{
                height: "200px",
                width: "90%",
                background: colors.lightGreen[700],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "20px",
              }}
            >
              <Typography
                variant="h6"
                sx={{ color: "white", textAlign: "center" }}
                gutterBottom
              >
                Total Fees Collected ({month})
              </Typography>
              <Typography variant="h3" sx={{ color: "white" }}>
                <span
                  style={{
                    color: "white",
                    fontSize: "26px",
                    paddingLeft: "10px",
                  }}
                >
                  RS.
                </span>
                {totalMonthFees}
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            md={4}
            sx={{ margin: { xs: "14px", sm: "0" } }}
          >
            <Box
              sx={{
                height: "200px",
                width: "90%",
                background: colors.lightGreen[700],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "20px",
              }}
            >
              <Typography variant="h6" sx={{ color: "white" }} gutterBottom>
                Total Expenses ({month})
              </Typography>
              <Typography variant="h3" sx={{ color: "white" }}>
                <span
                  style={{
                    color: "white",
                    fontSize: "26px",
                    paddingLeft: "10px",
                  }}
                >
                  RS.
                </span>
                {totalMonthExpenses}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          marginTop: "20px",
          padding: "0 6%",
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      >
        <Grid
          container
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ margin: { xs: "14px", sm: "0", textAlign: "center" } }}
          >
            <FormControl
              fullWidth
              sx={{
                width: {
                  xs: "94%",
                  sm: "75%",
                  md: "65%",
                },
                marginBottom: "15px",
              }}
            >
              <InputLabel id="demo-simple-select-label">
                Select Month
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Select Month"
                required
                onChange={(e) => setMonth(e.target.value)}
              >
                {monthNames?.map((month, index) => (
                  <MenuItem value={month}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box
              sx={{
                height: "400px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                borderRadius: "20px",
                border: `2px solid ${colors.lightGreen[700]}`,
              }}
            >
              <LineChart lineData={feesLineData} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          width: "88%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          border: `2px solid ${colors.lightGreen[700]}`,
          borderRadius: "20px",
        }}
      >
        <Box
          sx={{
            height: "74px",
            width: "93%",
            display: "flex",
            alignItems: "center",
            paddingLeft: { xs: "10px", sm: "20px", md: "30px" },
            paddingTop: { xs: "10px", sm: "20px", md: "35px" },
            borderBottom: `2px solid ${colors.lightGreen[700]}`,
          }}
        >
          <Typography variant="h5">Fee Reminders</Typography>
        </Box>
        <Box
          sx={{
            height: "350px",
            width: { xs: "97%", sm: "90%", md: "85%" },
            marginTop: "10px",
            overflowY: "scroll",
          }}
        >
          {reminders.length > 0
            ? reminders.map((reminder) => (
                <Link
                  key={reminder?.client?._id}
                  to={`/clients/profiles/${reminder?.client?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Alert
                    icon={
                      <img
                        src={reminder?.client?.profile?.url}
                        alt="profile"
                        style={{ height: "60px" }}
                      />
                    }
                    severity="success"
                    sx={{
                      height: "74px",
                      alignItems: "center",
                      margin: "20px 0",
                    }}
                  >
                    <Typography sx={{ marginLeft: "15px" }} variant="subtitle2">
                      Fee reminder for {reminder?.client?.name} on
                      <span style={{ paddingLeft: "5px" }}>
                        {reminder?.feeDate}
                      </span>
                    </Typography>
                  </Alert>
                </Link>
              ))
            : null}
        </Box>
      </Box>
      <Box
        sx={{
          width: "88%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          border: `2px solid ${colors.lightGreen[700]}`,
          borderRadius: "20px",
          marginTop: "20px",
        }}
      >
        <Box
          sx={{
            height: "74px",
            width: "93%",
            display: "flex",
            alignItems: "center",
            paddingLeft: { xs: "10px", sm: "20px", md: "30px" },
            paddingTop: { xs: "10px", sm: "20px", md: "35px" },
            borderBottom: `2px solid ${colors.lightGreen[700]}`,
          }}
        >
          <Typography variant="h5">Stock Reminders</Typography>
        </Box>
        <Box
          sx={{
            height: "350px",
            width: { xs: "97%", sm: "90%", md: "85%" },
            marginTop: "10px",
            overflowY: "scroll",
          }}
        >
          {stockReminders.length > 0
            ? stockReminders.map((reminder) => (
                <Link
                  key={reminder?.client?._id}
                  to={"/sales/utilities"}
                  style={{ textDecoration: "none" }}
                >
                  <Alert
                    icon={
                      <img
                        src={reminder?.image?.url}
                        alt="product"
                        style={{ height: "60px" }}
                      />
                    }
                    severity="success"
                    sx={{
                      height: "74px",
                      alignItems: "center",
                      margin: "20px 0",
                    }}
                  >
                    <Typography sx={{ marginLeft: "15px" }} variant="subtitle2">
                      Only
                      <span style={{ padding: "0 5px" }}>
                        {reminder?.stock}
                      </span>
                      stock remaining for {reminder?.name}
                    </Typography>
                  </Alert>
                </Link>
              ))
            : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
