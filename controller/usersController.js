import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/usersModel.js";
import Role from "../models/roleModel.js";

const usersController = {
  login: async (req, res) => {
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
      { id: user._id, email: user.email, role: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ message: "Đăng nhập thành công", token });
  },

  register: async (req, res) => {
    const { email, password, confirmPassword, roleId } = req.body;
    let newAccount;

    if (!email) return res.status(400).json({ message: "Thiếu trường email" });
    if (!password)
      return res.status(400).json({ message: "Thiếu trường mật khẩu" });
    if (!roleId)
      return res.status(400).json({ message: "Bạn quên chưa chọn quyền" });

    const role = await Role.findOne({ _id: roleId });
    
    console.log({ role });
    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      newAccount = new User({ email, password: hashedPassword, role });
      await newAccount.save();
    }

    return res.status(200).json(newAccount);
  },
};

export default usersController;
