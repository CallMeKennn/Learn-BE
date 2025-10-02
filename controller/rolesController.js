const Role = require("../models/roleModel");

exports.getAllRole = async (req, res) => {
  const roles = await Role.find();
  return res
    .status(200)
    .json({ message: "Lấy danh sách thành công", results: roles });
};

exports.addRole = async (req, res) => {
  const { name, discription } = req.body;
  if (!name) return res.status(400).json({ message: "Thiếu trường name" });
  if (!discription)
    return res.status(400).json({ message: "Thiếu mô tả" });
};
