// components/Dashboard.tsx
import React from "react";
import { Card, Row, Col, Statistic, Typography } from "antd";
import { Line } from "@ant-design/charts"; // Ant Design Charts 中的 Line 图表
import { UserOutlined, ShoppingCartOutlined, DollarOutlined } from "@ant-design/icons";
import { memo, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { Button } from 'antd';
import ReactDOM from 'react-dom';
import { isEqual } from 'lodash-es';

// 模拟数据（你可以从 API 获取这些数据）
const dashboardData = {
  totalOrders: 1500,
  totalSales: 35000,
  totalUsers: 1200,
  salesTrend: [
    { date: "2023-01-01", sales: 1500 },
    { date: "2023-02-01", sales: 1800 },
    { date: "2023-03-01", sales: 2200 },
    { date: "2023-04-01", sales: 2500 },
    { date: "2023-05-01", sales: 2700 },
    { date: "2023-06-01", sales: 3000 },
  ],
};

const { Title } = Typography;

const Dashboard = () => {
  const config = {
    data: dashboardData.salesTrend,
    xField: "date",
    yField: "sales",
    smooth: true,
    height: 300,
  };

  const DemoPie = memo(
    ({ data, onReady }) => {
      var config = {
        data,
        angleField: 'value',
        colorField: 'type',
        label: {
          text: 'value',
          position: 'outside',
        },
        onReady,
      };
      return <Pie {...config} />;
    },
    (pre, next) => {
      return isEqual(pre?.data, next?.data);
    },
  );

  const DemoMemo = () => {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([
      {
        type: '羽绒服',
        value: 27,
      },
      {
        type: '运动服',
        value: 25,
      },
      {
        type: '家居服',
        value: 18,
      },
      {
        type: '内衣',
        value: 15,
      },
      {
        type: '泳装',
        value: 10,
      },
      {
        type: '其他',
        value: 5,
      },
    ]);

    return (
      <div>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          不会重新渲染
        </Button>
        <Button
          style={{ margin: '0 10px' }}
          type="primary"
          onClick={() => {
            setData(data.map((d) => ({ ...d, value: Math.floor(Math.random() * 100) })));
          }}
        >
          重新渲染
        </Button>
        <span>{count}</span>
        <DemoPie data={data} onReady={({ chart }) => { }} />
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* <Title level={2}>仪表盘 (Dashboard)</Title> */}
      <Row gutter={16}>
        {/* 显示总订单数 */}
        <Col span={8}>
          <Card>
            <Statistic
              title="总订单数"
              value={dashboardData.totalOrders}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>

        {/* 显示销售额 */}
        <Col span={8}>
          <Card>
            <Statistic
              title="销售额"
              value={dashboardData.totalSales}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#cf1322" }}
              suffix="元"
            />
          </Card>
        </Col>

        {/* 显示用户数 */}
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={dashboardData.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#1d39c4" }}
            />
          </Card>
        </Col>
      </Row>

      {/* 销售趋势图 */}
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="销售趋势">
            <DemoMemo />12
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
