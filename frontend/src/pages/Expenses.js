import React, { useState, useEffect } from "react";

// CSS Import
import "../index.css";

// Redux Toolkit Import
import { useDispatch } from "react-redux";

// Redux Actions Import
import { createExpense } from "../redux/actions/expenseActions";

// Material UI Components Import
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  colors,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

// Components Import
import ExpensesTable from "../components/ExpensesTable";

// dayJs Import

const Expenses = () => {
  const dispatch = useDispatch();

  // States define
  const [selectedDate, setSelectedDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [mode, setMode] = useState("");

  const handleExpenseSubmit = () => {
    const newExpense = {
      date: selectedDate,
      category,
      expense: {
        description: description,
        amountPaid: paidAmount,
      },
    };
    dispatch(createExpense(newExpense));
    // window.location.reload();
  };

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
          <Typography variant="h5">Expenses Record</Typography>
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
                minHeight: "250px",
                border: `2px solid ${colors.lightGreen[700]}`,
                marginTop: "20px",
                borderRadius: "20px",
                padding: "15px",
                paddingBottom: "0",
              }}
            >
              <Grid container sx={{ height: "100%", width: "100%" }}>
                <Grid item xs={12} sx={{ height: "60px" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingLeft: "15px",
                      borderBottom: `2px solid ${colors.lightGreen[700]}`,
                      width: "98%",
                    }}
                  >
                    Add new expense
                  </Typography>
                </Grid>
                <Grid item sx={{ height: "230px", width: "100%" }} xs={12}>
                  <Box
                    sx={{
                      width: "100%",
                      padding: "10px 0",
                      textAlign: "right",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12} sm={6}>
                        <input
                          type="date"
                          className="datePicker"
                          onChange={(event) =>
                            setSelectedDate(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl fullWidth sx={{ width: "94%" }}>
                          <InputLabel id="demo-simple-select-label">
                            Category
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            required
                            onChange={(e) => setCategory(e.target.value)}
                          >
                            <MenuItem value={"Utility"}>Utility</MenuItem>
                            <MenuItem value={"Supplement"}>Supplement</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ marginTop: "15px" }}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="Description"
                          sx={{ width: "94%" }}
                          onChange={(event) =>
                            setDescription(event.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} sx={{ marginTop: "15px" }}>
                        <TextField
                          id="outlined-error-helper-text"
                          label="Paid Amount"
                          sx={{ width: "94%" }}
                          onChange={(event) =>
                            setPaidAmount(Number(event.target.value))
                          }
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
                          disabled={
                            !selectedDate || !paidAmount || !description
                          }
                          onClick={handleExpenseSubmit}
                          color="success"
                        >
                          Add Expense
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
                border: `2px solid ${colors.lightGreen[700]}`,
                marginTop: "30px",
                borderRadius: "20px",
                padding: "24px",
                paddingBottom: "30px",
              }}
            >
              <Grid container sx={{ height: "100%", width: "100%" }}>
                <Grid item xs={12} sx={{ height: "60px" }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      paddingLeft: "15px",
                      borderBottom: `2px solid ${colors.lightGreen[700]}`,
                      width: "98%",
                    }}
                  >
                    All Expenses
                  </Typography>
                </Grid>
                <Grid sx={{ width: "100%", textAlign: "center", marginBottom: '15px' }} item xs={12}>
                  <Typography variant="subtitle1">Select Category</Typography>
                  <FormControl sx={{ width: "240px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={mode}
                      label="Category"
                      required
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <MenuItem value={"Utility"}>Utility</MenuItem>
                      <MenuItem value={"Supplement"}>Supplement</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid sx={{ width: "100%" }} item xs={12}>
                  <ExpensesTable mode={mode} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Expenses;
