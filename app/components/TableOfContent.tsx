// app/login.tsx

'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Form, Row, Col, Card, Typography, message, Layout, theme, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from 'antd';
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));




export const menuListArray = [
  {
    key: '01',
    icon: <UserOutlined />,
    label: '仪表盘',
    children: [
      {
        key: 'cloth',
        label: '服装类',
      }
    ]
  },
  {
    key: '02',
    icon: <UserOutlined />,
    label: '订单管理',
    children: [
      {
        key: 'logistics',
        label: '物流',
      }
    ]
  },
];

export const handleMenuClick = (e: any) => {
  console.log('e', e)
  const router = useRouter();
  const selectedKey = e.key;
  if (selectedKey === 'cloth') {
    router.push('/dashboard')
  }
  if (selectedKey === 'logistics') {
    console.log('123')
    router.push('/orders')
  }
};

// const ShoppingMenu = ({ children }) => {
//   // 点击菜单项时的处理函数
//   // const router = useRouter();
//   // const handleMenuClick = (e: any) => {
//   //   const selectedKey = e.key;
//   //   if (selectedKey === 'cloth') {
//   //     router.push('/dashboard')
//   //   }
//   //   if (selectedKey === 'logistics') {
//   //     router.push('/orders')
//   //   }
//   // };
//   const [collapsed, setCollapsed] = useState(false);
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   return (
//     <div style={{ width: '100%', height: '100%' }}>
//       <Layout style={{ width: '100%', height: '100%' }}>
//         <Header style={{ display: 'flex', alignItems: 'center' }}>
//           <div className="demo-logo" />
//           <Menu
//             theme="dark"
//             mode="horizontal"
//             defaultSelectedKeys={['2']}
//             items={items1}
//             style={{ flex: 1, minWidth: 0 }}
//           />
//         </Header>
//         <Layout>
//           <Sider width={200} style={{ background: colorBgContainer }}>
//             <Menu
//               mode="inline"
//               defaultSelectedKeys={['cloth']}
//               defaultOpenKeys={['01']}
//               style={{ height: '100%', borderRight: 0 }}
//               items={menuListArray}
//               onClick={handleMenuClick}
//             />
//             {/* <MenuComponent /> */}
//           </Sider>
//           <Layout style={{ padding: '0 24px 24px' }}>
//             <Breadcrumb
//               items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
//               style={{ margin: '16px 0' }}
//             />
//             <Content
//               style={{
//                 padding: 24,
//                 margin: 0,
//                 minHeight: 280,
//                 background: colorBgContainer,
//                 borderRadius: borderRadiusLG,
//               }}
//             >
//               {/* 渲染不同页面的内容 */}
//               {children}
//             </Content>
//           </Layout>
//         </Layout>
//       </Layout>
//     </div>
//   );
// };

// export default ShoppingMenu;