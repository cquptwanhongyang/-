require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// 连接 MongoDB
connectDB();

// 允许 CORS 跨域
app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

// 使用用户路由
app.use("/api/users", userRoutes);

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
});