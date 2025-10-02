const Role = require("../models/roleModel");
import { MongoClient, ObjectId } from "mongodb";

exports.getAllRole = async (req, res) => {
  const roles = await Role.find();
  return res
    .status(200)
    .json({ message: "Lấy danh sách thành công", results: roles });
};

exports.addRole = async (req, res) => {
  const { name, discription } = req.body;
  if (!name) return res.status(400).json({ message: "Thiếu trường name" });
  if (!discription) return res.status(400).json({ message: "Thiếu mô tả" });

  const newRole = new Role({ name, discription });
  await newRole.save();
  res.status(201).json(newRole);
};

exports.editRole = async (req, res) => {
  const roleId = req.params.id;
  const { name, discription } = req.body;

  const role = await Role.findOne({ _id: roleId });
  console.log({ role });
};
