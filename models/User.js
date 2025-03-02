// models/User.js
// 引入 mongoose 库。mongoose 是一个用于 Node.js 的 MongoDB 对象建模工具，它可以让我们更方便地与 MongoDB 数据库进行交互。通过它，我们可以定义数据模式（Schema）以及创建和管理数据模型（Model）
const mongoose = require("mongoose");

// 定义用户 Schema
// mongoose.Schema 创建一个新的 Schema 实例，userSchema 变量将存储这个实例
// Schema 是用来定义数据结构的，它描述了 MongoDB 中文档的格式和类型
const userSchema = new mongoose.Schema({
  // 定义 name 字段，类型为 String，并且是必填字段
  name: { type: String, required: true },
  // 定义了role 字段，同样是 String 类型，且它的值必须是 "买家" 或 "卖家" 中的一个
  role: { type: String, enum: ["买家", "卖家"], required: true },
  // 定义了 createdAt 字段，类型为 Date，并且设置了默认值为当前时间（Date.now）。这意味着如果在创建文档时没有提供 createdAt 字段的值，系统会自动使用当前的日期和时间。
  createdAt: { type: Date, default: Date.now },
});

// 创建 User 模型
// 使用 mongoose.model 方法创建一个模型，模型的名字为 "User"，并且使用 userSchema 作为它的数据结构。这个 User 模型将用于与 MongoDB 中的 User 集合互动
const User = mongoose.model("User", userSchema);

// 将 User 模型导出，以便在其他文件中引用和使用。通过 module.exports，其他模块可以通过 require 语句引入这个模型。
module.exports = User;
