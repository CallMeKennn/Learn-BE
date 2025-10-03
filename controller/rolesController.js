import Role from "../models/roleModel.js";

const rolesController = {
  getAllRole: async (req, res) => {
    const roles = await Role.find();
    return res
      .status(200)
      .json({ message: "Lấy danh sách thành công", results: roles });
  },

  addRole: async (req, res) => {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ message: "Thiếu trường name" });
    if (!description) return res.status(400).json({ message: "Thiếu mô tả" });

    const newRole = new Role({ name, description });
    await newRole.save();
    res.status(201).json(newRole);
  },

  editRole: async (req, res) => {
    const roleId = req.params.id;
    const { name, description } = req.body;

    try {
      const role = await Role.findByIdAndUpdate(
        { _id: roleId },
        { name, description },
        { new: true }
      );

      if (!role) {
        return res.status(404).json({ message: "Không tìm thấy vai trò" });
      }

      return res.status(200).json({
        message: "Cập nhật vai trò thành công",
        role: role,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Lỗi server", error: err.message });
    }
  },
};

export default rolesController;
