// components/Menu.tsx
import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

const MenuComponent = () => {
  const router = useRouter();

  const menuItems = [
    { label: "Dashboard", key: "/dashboard" },
    { label: "Product List", key: "/product/1" },
    { label: "Settings", key: "/settings" },
  ];

  // 点击菜单项时跳转
  const handleClick = (e: any) => {
    router.push(e.key); // 使用 Next.js 的 `router.push` 跳转页面
  };



  return (
    <Menu onClick={handleClick} mode="inline" defaultSelectedKeys={["/dashboard"]}>
      {menuItems.map(item => (
        <Menu.Item key={item.key} >{item.label}</Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuComponent;
