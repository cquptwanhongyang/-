'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Form, Row, Col, Card, Typography, message, Layout, theme, Menu, Breadcrumb } from "antd";
import type { MenuProps } from 'antd';
// import style from '../index'
const { Header, Sider, Content } = Layout;\
o; const ShoppingHeader = () => {

  const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));
  return (
    <>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div className='header'>
          登出
        </div>
      </Header>
    </>
  )
}

export default ShoppingHeader