import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  FormControl,
  InputLabel,
  Select,
  Button,
  Menu,
  MenuItem,
  Divider,
  TextField,
} from "@mui/material";

const StyledMenu = styled((props) => (
  <Menu
    sx={{ minWidth: "300px" }}
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 300,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function StatusMenu({ receipt, setFeeReceipt, setReceiptData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);
  const [paidDate, setPaidDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const isPaid = status === "Paid" ? true : false;

  const amountBalance = receipt?.totalBalanceAmount - amountPaid;

  const totalAmountPaid = Number(receipt?.paidAmount) + Number(amountPaid);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ fontSize: "14px" }}
        color="success"
      >
        Update
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem disableRipple>
          <input
            type="date"
            className="datePicker"
            onChange={(e) => setPaidDate(e.target.value)}
            style={{ width: "100%" }}
            required
          />
        </MenuItem>
        <MenuItem disableRipple>
          <TextField
            id="outlined-error-helper-text"
            label="Paid Amount"
            fullWidth
            onChange={(event) => setAmountPaid(event.target.value)}
          />
        </MenuItem>
        <MenuItem disableRipple>
          <TextField
            id="outlined-error-helper-text"
            label="Balance Amount"
            value={receipt.totalBalanceAmount - amountPaid}
            InputProps={{
              readOnly: true,
            }}
            fullWidth
          />
        </MenuItem>
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={paymentMethod}
              label="Status"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value={"Cash"}>Cash</MenuItem>
              <MenuItem value={"Online"}>Online</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <MenuItem disableRipple>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value={"Paid"}>Paid</MenuItem>
              <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
            </Select>
          </FormControl>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          disableRipple
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            variant="contained"
            sx={{ width: "86%" }}
            color="success"
            onClick={() => {
              setFeeReceipt(true);
              setReceiptData({
                id: receipt?.id,
                date: receipt?.date,
                paidDate,
                client: receipt?.name,
                category: receipt?.category,
                amount: receipt?.totalAmount,
                paid: totalAmountPaid,
                balance: Number(receipt?.totalAmount) - Number(totalAmountPaid),
                method: paymentMethod,
                status,
                amountBalance,
                feesId: receipt?.feesId,
              });
            }}
            disabled={!status || !amountPaid}
          >
            Create Receipt
          </Button>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
