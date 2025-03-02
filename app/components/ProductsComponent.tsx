// pages/products.tsx
import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, InputNumber, Select, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { mockProducts } from "../../lib/mockProducts";

const { Option } = Select;

const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form] = Form.useForm();

  // 显示添加/编辑弹窗
  const showModal = (product = null) => {
    setEditingProduct(product);
    setIsModalVisible(true);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  };

  // 处理表单提交
  const handleOk = () => {
    form.validateFields().then(values => {
      if (editingProduct) {
        // 更新产品信息
        setProducts(products.map(p => (p.id === editingProduct.id ? { ...p, ...values } : p)));
        message.success("商品更新成功！");
      } else {
        // 添加新商品
        setProducts([...products, { id: (products.length + 1).toString(), ...values }]);
        message.success("商品添加成功！");
      }
      setIsModalVisible(false);
    });
  };

  // 删除商品
  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
    message.success("商品删除成功！");
  };

  // 商品表格列配置
  const columns = [
    {
      title: "商品图片",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <img src={image} alt="product" width="50" />,
    },
    {
      title: "商品名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "价格",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "促销价",
      dataIndex: "discountPrice",
      key: "discountPrice",
      render: (discountPrice: number) => `$${discountPrice}`,
    },
    {
      title: "库存",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "分类",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "操作",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button icon={<EditOutlined />} onClick={() => showModal(record)} style={{ marginRight: 8 }}>
            编辑
          </Button>
          <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
            删除
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>商品管理</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()} style={{ marginBottom: 16 }}>
        添加商品
      </Button>

      <Table columns={columns} dataSource={products} rowKey="id" />

      {/* 添加/编辑商品模态框 */}
      <Modal title={editingProduct ? "编辑商品" : "添加商品"} visible={isModalVisible} onOk={handleOk} onCancel={() => setIsModalVisible(false)}>
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="商品名称" rules={[{ required: true, message: "请输入商品名称" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="价格" rules={[{ required: true, message: "请输入价格" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="discountPrice" label="促销价">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="stock" label="库存" rules={[{ required: true, message: "请输入库存数量" }]}>
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="category" label="分类" rules={[{ required: true, message: "请选择分类" }]}>
            <Select>
              <Option value="手机">手机</Option>
              <Option value="笔记本">笔记本</Option>
              <Option value="耳机">耳机</Option>
            </Select>
          </Form.Item>
          <Form.Item name="brand" label="品牌">
            <Select>
              <Option value="Apple">Apple</Option>
              <Option value="Samsung">Samsung</Option>
              <Option value="Sony">Sony</Option>
            </Select>
          </Form.Item>
          <Form.Item name="image" label="商品图片">
            <Upload maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
