const express = require("express");
const router = express.Router();

// Controllers
const {
  getAllReminders,
  createReminder,
} = require("../controllers/reminderController");

router.get("/reminder", getAllReminders);
router.post("/reminder/create", createReminder);

module.exports = router;
