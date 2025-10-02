const express = require("express");
const router = express.Router();
const roleController = require("../controller/rolesController");

//Cập nhật role Id
router.put("/:id", roleController.editBooks);

module.exports = router;
