const mongoose = require("mongoose");

const userScheme = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true, encode: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

const User = mongoose.model("User", userScheme);

module.exports = User;
