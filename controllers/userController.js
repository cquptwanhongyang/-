const User = require("../models/User");

// 1️⃣ 获取所有用户
const getUsers = async (req, res) => {
  try {
    const { name } = req.query;
    console.log('name', name)
    // 查询条件：如果提供 name，则进行精准匹配，否则查询所有用户
    const query = name ? { name: name.trim() } : {};

    // 查询 MongoDB
    const users = await User.find(query);

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "❌ 获取用户失败", error: error.message });
  }
};

// 2️⃣ 添加用户
const addUser = async (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ message: "❌ 名称和角色不能为空" });
  }

  try {
    const newUser = new User({ name, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "❌ 创建用户失败", error });
  }
};

// 3️⃣ 删除用户
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "✅ 用户删除成功" });
  } catch (error) {
    res.status(500).json({ message: "❌ 删除用户失败", error });
  }
};

const registerUser = async (req, res) => {
  const { name, role, password } = req.body;
  try {
    const user = await User.register(name, role, password);
    res.status(201).json({ success: true, message: "用户注册成功", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.login(name, password);
    res.status(200).json({ success: true, message: "用户登录成功", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  addUser,
  deleteUser,
  registerUser,
  loginUser,
};