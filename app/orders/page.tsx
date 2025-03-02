'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Form, Row, Col, Card, Typography, message, Layout, theme, Menu, Breadcrumb } from "antd";
import OrderCompenent from "../components/OrderCompenent";
import ShoppingHeader from "../components/Header"
import ShoppingSider from "../components/Sider"
import ShoppingBreadcrumb from "../components/Breadcrumb"

const { Content } = Layout;
const DashboardPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Layout style={{ width: '100%', height: '100%' }}>
        <ShoppingHeader />
        <Layout>
          <ShoppingSider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <ShoppingBreadcrumb />
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <OrderCompenent />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default DashboardPage;
