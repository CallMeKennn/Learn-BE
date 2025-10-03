import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true, encode: true },
  role: {
    _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
  }, 
});

const User = mongoose.model("User", userScheme);

export default User;
