// app/login.tsx

'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Form, Row, Col, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from '../../constants/apiConstants'
import { menuListArray } from "../components/TableOfContent"

const { Title } = Typography;

const Login = () => {
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false); // 用来切换登录/注册状态

  const handleLogin = (values: any) => {
    // router.push('/dashboard')
    console.log("Login values: ", values);
    createPost()
    message.success("Login successful");
  };

  // 注册
  const handleRegister = (values: any) => {
    console.log("Register values: ", values);
    message.success("Registration successful");
  };

  // 切换登录注册状态
  const switchToRegister = () => {
    setIsRegistering(true);
  };
  const switchToLogin = () => {
    setIsRegistering(false);
  };

  // 发起请求
  const createPost = async () => {
    const res = await fetch(`${API_BASE_URL}/login`)
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Post",
        content: "This is a new post",
      }),
    });
    const data = await response.json();
    console.log(data);
  };


  return (
    <div className="login-container" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
      <Card style={{ width: 600 }}>
        <Title level={2} style={{ textAlign: "center" }}>
          武汉市电商后台管理系统
        </Title>
        <Title level={2} style={{ textAlign: "center" }}>
          {isRegistering ? "Register" : "Login"}
        </Title>
        <Form
          name="auth"
          initialValues={{ remember: true }}
          onFinish={isRegistering ? handleRegister : handleLogin}
          style={{ padding: "20px" }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          {isRegistering && (
            <Form.Item
              name="confirmPassword"
              rules={[{ required: true, message: "Please confirm your password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm Password"
              />
            </Form.Item>
          )}

          <Form.Item style={{ textAlign: "center" }}>
            <Button type="primary" htmlType="submit" block>
              {isRegistering ? "Register" : "Login"}
            </Button>
          </Form.Item>
        </Form>

        {/* 切换注册登录状态 */}
        <Row justify="center">
          <Col>
            <Button type="link" onClick={isRegistering ? switchToLogin : switchToRegister}>
              {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Login;
