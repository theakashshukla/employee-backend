var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { isAuthenticated } = require("../middleware/auth");

/* GET users listing. */
router.get("/user", async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({ _id: userId }).populate("timesheets");
    if (!user) {
      throw new Error("User not Found");
    }
    const userData = {
      username: user.username,
      email: user.name,
      timesheets: user.timesheets,
    };
    res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error)
    res.status(500).json({error: "Internal Server Error"})
  }
});

module.exports = router;
