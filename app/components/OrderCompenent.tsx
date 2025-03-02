// pages/orders.tsx
import { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, DatePicker, Space } from "antd";
import { mockOrders } from "../../lib/mockOrders";
import { DownloadOutlined } from "@ant-design/icons";
import moment from "moment";
import { useRouter } from "next/navigation";

const { Option } = Select;

const OrderManagement = () => {
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // 筛选功能
  const handleSearch = (values: any) => {
    const { date, status } = values;
    let filteredOrders = mockOrders;

    if (date) {
      const startDate = moment(date[0]).startOf("day");
      const endDate = moment(date[1]).endOf("day");
      filteredOrders = filteredOrders.filter(order =>
        moment(order.orderDate).isBetween(startDate, endDate, undefined, "[]")
      );
    }

    if (status) {
      filteredOrders = filteredOrders.filter(order => order.orderStatus === status);
    }

    setOrders(filteredOrders);
  };

  // 查看订单详情
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // 改变订单状态
  const handleChangeStatus = (orderId: string, status: string) => {
    const updatedOrders = orders.map(order => {
      if (order.orderId === orderId) {
        return { ...order, orderStatus: status };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  // 导出订单数据
  const handleExport = () => {
    const data = orders.map(order => ({
      OrderID: order.orderId,
      User: order.user,
      Status: order.orderStatus,
      Amount: order.totalAmount,
      Date: order.orderDate,
    }));

    const csvContent = [
      ["OrderID", "User", "Status", "Amount", "Date"],
      ...data.map(item => Object.values(item)),
    ]
      .map(row => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "orders.csv");
    link.click();
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text: number) => `$${text}`,
    },
    {
      title: "Order Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text: string) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Button type="link" onClick={() => handleViewOrder(record)}>
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h2>Order Management</h2>
      <Form onFinish={handleSearch} layout="inline" style={{ marginBottom: "16px" }}>
        <Form.Item name="date">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item name="status">
          <Select placeholder="Select Status" style={{ width: 120 }}>
            <Option value="pending">Pending</Option>
            <Option value="completed">Completed</Option>
            <Option value="canceled">Canceled</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport} style={{ marginBottom: "16px" }}>
        Export Orders
      </Button>

      <Table columns={columns} dataSource={orders} rowKey="orderId" />

      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        {selectedOrder && (
          <div>
            <h3>Items</h3>
            <ul>
              {selectedOrder.items.map((item: any) => (
                <li key={item.product}>
                  {item.product} - ${item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount}</p>
            <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
            <p><strong>Shipping Info:</strong> {selectedOrder.shippingInfo}</p>

            <div style={{ marginTop: "16px" }}>
              <Button
                type="primary"
                onClick={() => handleChangeStatus(selectedOrder.orderId, "completed")}
                style={{ marginRight: "8px" }}
              >
                Mark as Completed
              </Button>
              <Button
                type="default"
                onClick={() => handleChangeStatus(selectedOrder.orderId, "canceled")}
              >
                Cancel Order
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
