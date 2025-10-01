const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
 
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(500).json({ message: "Thiếu trường email" });
  if (!password)
    return res.status(500).json({ message: "Thiếu trường mật khẩu" });

  const newAccount = new User({ email, password });
  await newAccount.save();
  res.status(200).json({ message: "Đăng nhập thành công" });
};

exports.register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email) return res.status(500).json({ message: "Thiếu trường email" });
  if (!password)
    return res.status(500).json({ message: "Thiếu trường mật khẩu" });

  const users = db.collection("User");

  const user = await users.findOne({ email: email });
  if (!user) {
    res.status(401).json({ message: "User không tồn tại" });
  }

  // 2. Kiểm tra password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Sai mật khẩu");
  }

  res.status(200).json(newAccount);
};
