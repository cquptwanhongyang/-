import React, { useEffect, useState } from "react";
import { Menu, Layout, theme } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const menuListArray = [
  {
    key: '01',
    icon: <UserOutlined />,
    label: '仪表盘',
    children: [
      {
        key: 'dashboard',
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
        key: 'orders',
        label: '物流',
      }
    ]
  },
  {
    key: '03',
    icon: <UserOutlined />,
    label: '商品管理',
    children: [
      {
        key: 'products',
        label: '商品',
      }
    ]
  },
  {
    key: '04',
    icon: <UserOutlined />,
    label: '用户管理',
    children: [
      {
        key: 'manageUsers',
        label: '用户',
      }
    ]
  },
];

const ShoppingSider = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['dashboard']);
  useEffect(() => {

    const menuArray = ['dashboard', 'orders', 'products', 'manageUsers']
    const currentUrl = window.location.href;
    // 查找当前 URL 中是否包含 menuArray 的某个元素
    const foundElement = menuArray.find(item => currentUrl.includes(item));

    if (foundElement) {
      console.log(`当前 URL 包含的元素是: ${foundElement}`);
      setSelectedKeys([`${foundElement}`]); // 更新选中状态
    } else {
      console.log('当前 URL 不包含 menuArray 中的任何元素');
    }
  }, [])

  const handleMenuClick = (e: any) => {
    const selectedKey = e.key;

    // 根据点击的菜单项 key 跳转不同页面
    if (selectedKey === 'dashboard') {
      router.push('/dashboard');
    }
    if (selectedKey === 'orders') {
      router.push('/orders');
    }
    if (selectedKey === 'products') {
      router.push('./products')
    }
    if (selectedKey === 'manageUsers') {
      router.push('./manageUsers')
    }
  };

  return (
    <Sider width={200} style={{ background: colorBgContainer }}>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}  // 绑定动态选中状态
        defaultOpenKeys={selectedKeys}
        // openKeys={`${selectedKeys[0]}`}
        style={{ height: '100%', borderRight: 0 }}
        items={menuListArray}
        onClick={handleMenuClick}
      />
    </Sider>
  );
};

export default ShoppingSider;