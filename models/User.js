// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// 定义用户 Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ["买家", "卖家"], required: true },
  password: { type: String, required: true }, // 添加 password 字段
  createdAt: { type: Date, default: Date.now },
});

// 注册方法
userSchema.statics.register = async function (name, role, password) {
  // 检查用户是否已存在
  const existingUser = await this.findOne({ name });
  if (existingUser) {
    throw new Error("用户已存在");
  }

  // 哈希密码
  const hashedPassword = await bcrypt.hash(password, 10);

  // 创建新用户
  const user = new this({ name, role, password: hashedPassword });
  await user.save();
  return user;
};

// 登录方法
userSchema.statics.login = async function (name, password) {
  // 查找用户
  const user = await this.findOne({ name });
  if (!user) {
    throw new Error("用户不存在");
  }

  // 验证密码
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("密码错误");
  }

  return user;
};

// 创建 User 模型
const User = mongoose.model("User", userSchema);

// 导出 User 模型
module.exports = User;
