const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true, encode: true },
});

const User = mongoose.model("User", userScheme);

module.exports = User;
