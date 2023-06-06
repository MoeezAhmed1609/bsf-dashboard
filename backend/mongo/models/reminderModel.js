const mongoose = require("mongoose");
require("datejs");

const reminderSchema = mongoose.Schema({
  id : {
    type: String,
    required: true
  },
  profile: {
    public_id: String,
    url: String,
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Reminders", reminderSchema);
