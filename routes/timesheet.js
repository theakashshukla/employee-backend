const express = require("express");
const router = express.Router();
const { isLoggedIn, isEmployee, isManager } = require("../middleware/auth");
const Timesheet = require("../models/Timesheet");

router.post("/submit", isLoggedIn, isEmployee, async (req, res) => {
  try {
    const { dayDate, hours, projectName, description, performanceRemark } =
      req.body;
    const timesheet = await Timesheet.create({
      user: req.user._id,
      dayDate,
      hours,
      projectName,
      description,
      performanceRemark,
    });
    req
      .status(201)
      .json({ message: "Timesheet Submitted successfully", timesheet });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
});

router.put("/update/:id", isLoggedIn, async (req, res) => {
  try {
    const timesheetId = req.params.id;
    const { dayDate, hours, projectName, description, performanceRemark } =
      req.body;
    const timesheet = await Timesheet.findById(timesheetId);
    if (!timesheet) {
      return res.status(404).json({ error: "TImesheet not Found" });
    }
    if (
      timesheet.user.toString() !== req.user._id.toString() &&
      req.user.role !== "manager"
    ) {
      return res.status(403).json({ error: "Forbidden" });
    }

    timesheet.dayDate = dayDate;
    timesheet.hours = hours;
    timesheet.projectName = projectName;
    timesheet.description = description;
    timesheet.performanceRemark = performanceRemark;
  } catch (error) {}
});

router.post("/rate/:id", isLoggedIn, isManager, async (req, res) => {
  try {
    const { rating } = req.body;
    const timesheetId = req.params.id;
    const timesheet = await Timesheet.findByIdAndUpdate(timesheetId);
    if (timesheet.locked){
      return res.status(400).json({error:'TImesheet is Locked. Rating can not be changed.'})
    }

    timesheet.rating = rating;
    await timesheet.save();
    res.status(200).json({message: 'Rating added successfuly.'})
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Timesheet Rating Failed",
    });
  }
});

router.put("/lock/:id", isLoggedIn, isManager, async (req, res) => {
  try {
    const timesheet = await Timesheet.findByIdAndUpdate(
      req.params.id,
      { rating, locked: true },
      { new: true }
    );
    res.json({ timesheet });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Locking timesheet Failed",
    });
  }
});

module.exports = router;
