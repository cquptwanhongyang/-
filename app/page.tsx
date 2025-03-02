import { redirect } from "next/navigation";
// import "antd/dist/antd.css"; // 引入 Ant Design 样式
import "./globals.css"; // 你自己的全局样式
// import "/iconfont/iconfont.js";

export default function Home() {
  redirect("/login"); // 直接重定向到 /login
  return null;
}
