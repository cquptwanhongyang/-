const express = require("express");
const { getUsers, addUser, deleteUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);         // 获取所有用户
router.post("/", addUser);         // 添加用户
router.delete("/:id", deleteUser); // 删除用户

module.exports = router;