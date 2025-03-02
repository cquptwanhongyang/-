'use client';

import React, { useState, useEffect } from "react";
import { Button, Input, Form, Row, Col, Card, Typography, message, Layout, theme, Menu, Breadcrumb } from "antd";


const ShoppingBreadcrumb = () => {
  return (
    <>
      <Breadcrumb
        items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
        style={{ margin: '16px 0' }}
      />
    </>
  )
}

export default ShoppingBreadcrumb