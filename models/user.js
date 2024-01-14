const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "manager", "employee"],
    default: "employee",
  },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
