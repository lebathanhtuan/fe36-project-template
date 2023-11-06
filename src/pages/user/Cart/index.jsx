import {
  Table,
  Button,
  InputNumber,
  Row,
  Col,
  Card,
  Space,
  Breadcrumb,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeQuantity = (productId, value) => {};

  const handleDeleteCartItem = (productId) => {};

  const tableColumn = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (_, item) => {
        return `${item.price.toLocaleString()} VNĐ`;
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, item) => (
        <InputNumber
          value={item.quantity}
          min={1}
          onChange={(value) => handleChangeQuantity(item.productId, value)}
        />
      ),
    },
    {
      title: "Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VNĐ`,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Button danger onClick={() => handleDeleteCartItem(item.productId)}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <S.CartListWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: "Giỏ hàng",
          },
        ]}
      />
      <h2 style={{ marginBottom: 16, textAlign: "center" }}>Giỏ hàng</h2>
      <Card size="small">
        <Table
          columns={tableColumn}
          dataSource={[]}
          rowKey="id"
          pagination={false}
        />
      </Card>
      <Row justify="end" style={{ margin: "24px 0" }}>
        <Col span={8}>
          <Card size="small" title="Tổng tiền">
            0 VND
          </Card>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          disabled
          onClick={() => navigate(ROUTES.USER.CHECKOUT)}
        >
          Tiếp theo
        </Button>
      </Row>
    </S.CartListWrapper>
  );
}

export default CartPage;