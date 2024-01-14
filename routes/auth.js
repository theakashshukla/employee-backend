const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require('../models/user')

router.post("/register", async (req, res) => {
  try {
    const { username, name, password, role } = req.body;
    const user = await User.register(new User({ username, name, role }), password);
    res.status(201).json({ user });
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ message: "Login Succesful" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logout Succesful" });
});

module.exports = router;
