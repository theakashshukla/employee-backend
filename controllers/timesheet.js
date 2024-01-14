// // const Timesheet = require("../models/timesheet");

// module.exports = {
//   submitTimesheet: async (req, res) => {
//     const { dayDate, hours, projectName, description, performanceRemark } =
//       req.body;
//     const userId = req.user._id;
//     try {
//       const timesheet = await Timesheet.create({
//         userId,
//         dayDate,
//         hours,
//         projectName,
//         description,
//         performanceRemark,
//       });
//       req.json({ message: "Timesheet Submitted successfully", timesheet });
//     } catch (error) {
//       res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//   },
//   editTimesheet: async (req, res) => {
//     const timesheetId = req.params.id;
//     const { dayDate, hours, projectName, description, performanceRemark } =
//       req.body;

//     try {
//       const timesheet = await Timesheet.findByIdAndUpdate(
//         timesheetId,
//         { dayDate, hours, projectName, description, performanceRemark },
//         { new: true }
//       );
//       req.json({ message: "Timesheet Update successfully", timesheet });
//     } catch (error) {
//       res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//   },
//   getTasks: async (req, res) => {
//     const userId = req.user._id;
//     try {
//       const tasks = await Timesheet.find({ userId });
//       res.json({ tasks });
//     } catch (error) {
//       res.status(500).json({
//         error: "Internal Server Error",
//       });
//     }
//   },
// };
