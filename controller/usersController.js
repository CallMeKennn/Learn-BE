const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: "Thiếu trường email" });
  if (!password)
    return res.status(400).json({ message: "Thiếu trường mật khẩu" });

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "User không tồn tại" });
  }

  // 2. Kiểm tra password
  const match = await bcrypt.compare(password, user.password);
  console.log({ match });
  if (!match) {
    return res.status(401).json({ message: "Sai mật khẩu" });
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({ message: "Đăng nhập thành công", token });
};

exports.register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  let newAccount;

  if (!email) return res.status(400).json({ message: "Thiếu trường email" });
  if (!password)
    return res.status(400).json({ message: "Thiếu trường mật khẩu" });

  if (password === confirmPassword) {
    const hashedPassword = await bcrypt.hash(password, 10);
    newAccount = new User({ email, password: hashedPassword });
    await newAccount.save();
  }

  return res.status(200).json(newAccount);
};
