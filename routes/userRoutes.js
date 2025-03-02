const express = require("express");
const { getUsers, addUser, deleteUser, registerUser, loginUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);              // 获取所有用户
router.post("/", addUser);              // 添加用户
router.delete("/:id", deleteUser);      // 删除用户
router.post("/register", registerUser); // 注册
router.post("/login", loginUser);       // 登录

module.exports = router;