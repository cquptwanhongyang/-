// seed.js - 运行一次以添加初始数据
// 导入 dotenv 包并调用 config 函数，它会读取 .env 文件中的环境变量，并将其加载到 process.env 对象中。这通常用于存储敏感信息，比如数据库连接字符串。
require("dotenv").config();
// 引入了 mongoose 库
const mongoose = require("mongoose");
// 引入了 User 模型 模型定义了用户数据的结构（例如字段及其类型），并通过 Mongoose 来与数据库中的用户集合交互。
const User = require("./models/User");

// 使用 Mongoose 连接到 MongoDB 数据库
// process.env.MONGO_URI 是从 .env 文件中读取的连接字符串
// useNewUrlParser 和 useUnifiedTopology 是 Mongoose 的选项，用于启用新的 URL 解析器和统一的拓扑结构，以避免警告
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("✅ MongoDB 连接成功，开始初始化数据...");

    // 清空数据库里的用户数据（避免重复）
    await User.deleteMany({});

    // 创建初始用户
    const users = [
      { name: "Alice", role: "买家" },
      { name: "Bob", role: "卖家" },
      { name: "Charlie", role: "买家" },
    ];

    // 将之前定义的用户数组插入到数据库的用户集合中。insertMany 方法用于批量插入文档
    await User.insertMany(users);
    console.log("✅ 初始数据添加成功！");
    process.exit(); // 结束进程
  })
  .catch(err => {
    console.error("❌ MongoDB 连接失败:", err);
    process.exit(1);
  });
