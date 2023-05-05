// Models Import
const Expenses = require("../mongo/models/expenseModel");

// Get all sales
exports.getAllExpenses = async (req, res) => {
  const expenses = await Expenses.find();

  res.status(200).json({
    success: true,
    expenses,
  });
};

// Create new expense record
exports.createExpenseRecord = async (req, res, next) => {
  const expense = await Expenses.create(req.body);

  res.status(200).json({
    success: true,
    expense,
  });
};

// Delete expense record
exports.deleteExpenseRecord = async (req, res, next) => {
  const expense = await Expenses.findByIdAndDelete(req.body.id);

  res.status(200).json({
    success: true,
    expense,
  });
};