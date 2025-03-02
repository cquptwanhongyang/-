// lib/mockOrders.ts

export const mockOrders = [
  {
    orderId: "1001",
    user: "Alice",
    orderStatus: "pending",
    totalAmount: 150,
    orderDate: "2025-02-01",
    paymentStatus: "paid",
    items: [
      { product: "T-Shirt", price: 50, quantity: 2 },
      { product: "Jeans", price: 50, quantity: 1 },
    ],
    shippingInfo: "Shipped via DHL, tracking #12345",
  },
  {
    orderId: "1002",
    user: "Bob",
    orderStatus: "completed",
    totalAmount: 200,
    orderDate: "2025-02-05",
    paymentStatus: "paid",
    items: [
      { product: "Laptop", price: 200, quantity: 1 },
    ],
    shippingInfo: "Shipped via UPS, tracking #67890",
  },
  // 添加更多模拟订单...
];
