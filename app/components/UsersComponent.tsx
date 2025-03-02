// pages/users.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, message, Modal, Form, Input, Select, Space, Card, Row, Col, Popconfirm } from "antd";
import { PlusOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { API_BASE_URL } from '../../constants/apiConstants'

const { Option } = Select;
// const API_BASE_URL = "http://localhost:5000/api"; // 连接后端

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchName, setSearchName] = useState("");
  const [loading, setLoading] = useState(false);

  // 获取用户列表
  const fetchUsers = async (searchName = "") => {
    try {
      const res = await fetch(`${API_BASE_URL}/users?name=${searchName}`);
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      message.error("❌ 获取用户失败");
    }
  };

  // 删除用户（带二次确认）
  const deleteUser = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/users/${id}`, { method: "DELETE" });
      message.success("✅ 用户删除成功");
      fetchUsers();
    } catch (error) {
      message.error("❌ 删除用户失败");
    }
  };

  // 显示添加用户弹窗
  const showModal = () => {
    setIsModalVisible(true);
    form.resetFields(); // 清空表单
  };

  // 关闭弹窗
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 添加用户
  const handleAddUser = async () => {
    try {
      const values = await form.validateFields();
      const res = await fetch(`${API_BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("❌ 添加用户失败");
      message.success("✅ 用户添加成功");
      setIsModalVisible(false);
      fetchUsers();
    } catch (error) {
      message.error("❌ 无法添加用户");
    }
  };

  // 处理精准查找
  const handleSearch = () => {
    fetchUsers(searchName);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 用户表格列配置
  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "用户名", dataIndex: "name", key: "name" },
    { title: "角色", dataIndex: "role", key: "role" },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Popconfirm title="确定要删除该用户吗？" onConfirm={() => deleteUser(record._id)} okText="是" cancelText="否">
            <Button danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card style={{ margin: "20px" }}>
      {/* 搜索和添加用户 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="输入用户名"
            value={searchName}
            onChange={e => setSearchName(e.target.value)}
            allowClear
          />
        </Col>
        <Col>
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>添加用户</Button>
        </Col>
      </Row>

      {/* 用户列表 */}
      <Table columns={columns} dataSource={users} rowKey="_id" loading={loading} />

      {/* 添加用户模态框 */}
      <Modal title="添加用户" visible={isModalVisible} onOk={handleAddUser} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="用户名" rules={[{ required: true, message: "请输入用户名" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="角色" rules={[{ required: true, message: "请选择角色" }]}>
            <Select>
              <Option value="买家">买家</Option>
              <Option value="卖家">卖家</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserManagement;
