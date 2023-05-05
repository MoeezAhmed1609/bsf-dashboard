const express = require("express");

// Controllers Import
const {
  getAllExpenses,
  createExpenseRecord,
  deleteExpenseRecord,
} = require("../controllers/expenseController");

const router = express.Router();

// Routes
router.get("/expenses", getAllExpenses);
router.post("/expenses/create", createExpenseRecord);
router.delete("/expenses/delete", deleteExpenseRecord);

module.exports = router;
