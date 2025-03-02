// lib/mongodb.ts

import { MongoClient } from "mongodb";

// 你的 MongoDB URI
const MONGODB_URI = "mongodb://localhost:27017"; // 替换为你的 MongoDB 连接 URI
const MONGODB_DB = "your_database_name"; // 替换为你想使用的数据库名称

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // 在开发环境中使用全局变量来避免每次修改文件时都重新创建连接
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = MongoClient.connect(MONGODB_URI);
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // 在生产环境中直接创建客户端连接
  clientPromise = MongoClient.connect(MONGODB_URI);
}

export default clientPromise;
