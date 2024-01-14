const mongoose = require("mongoose");

const timesheetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  dayDate: { type: Date, required: true },
  hours: { type: Number, required: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  performanceRemark: { type: String },
  rating: { type: Number, default: null },
  locked: { type: Boolean, default: false },
});

module.exports = mongoose.model("Timesheet", timesheetSchema);
