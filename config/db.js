const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ MongoDB 连接成功");
  } catch (err) {
    console.error("❌ MongoDB 连接失败:", err);
    process.exit(1); // 连接失败时退出进程
  }
};

module.exports = connectDB;