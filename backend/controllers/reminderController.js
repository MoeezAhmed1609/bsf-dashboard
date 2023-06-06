// Reminder Model Import
const Reminder = require("../mongo/models/reminderModel");

// Get All Reminder
exports.getAllReminders = async (req, res, next) => {
  const reminders = await Reminder.find();
  res.status(200).json({
    success: true,
    reminders,
  });
};

// Create Reminder
exports.createReminder = async (req, res, next) => {
  const { id, profile, name, date } = req.body.reminder;

  const reminder = await Reminder.create({
    id,
    profile,
    name,
    date,
  });
  res.status(201).json({
    success: true,
    reminder,
  });
};
