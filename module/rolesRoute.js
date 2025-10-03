import express from "express";
const router = express.Router();
import roleController from "../controller/rolesController.js";

//Cập nhật role Id
router.put("/:id", roleController.editRole);
router.post("/", roleController.addRole);
router.get("/", roleController.getAllRole);

export default router;
