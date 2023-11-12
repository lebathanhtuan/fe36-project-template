import { useEffect, useMemo, useState } from "react";
import {
  Card,
  Row,
  Col,
  Checkbox,
  Select,
  Button,
  Segmented,
  Space,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link, generatePath } from "react-router-dom";
import { AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import qs from "qs";

import { getProductListRequest } from "redux/slicers/product.slice";
import { getCategoryListRequest } from "redux/slicers/category.slice";

import { ROUTES } from "constants/routes";
import { PRODUCT_LIMIT } from "constants/paging";
import * as S from "./styles";

function ProductListPage() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    sortOrder: undefined,
    searchKey: "",
  });
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

  useEffect(() => {
    const searchParams = qs.parse(search, { ignoreQueryPrefix: true });
    const newFilterParams = {
      categoryId: searchParams.categoryId
        ? searchParams.categoryId.map((id) => parseInt(id))
        : [],
      sortOrder: searchParams.sortOrder,
      searchKey: searchParams.searchKey || "",
    };
    setFilterParams(newFilterParams);
    dispatch(
      getProductListRequest({
        page: 1,
        limit: PRODUCT_LIMIT,
        ...newFilterParams,
      })
    );
  }, [search]);

  const handleFilter = (key, value) => {
    navigate({
      pathname: ROUTES.USER.PRODUCT_LIST,
      search: qs.stringify({
        ...filterParams,
        [key]: value,
      }),
    });
  };

  const handleShowMore = () => {
    dispatch(
      getProductListRequest({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col key={item.id} span={24}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  }, [categoryList.data]);

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col key={item.id} lg={6} md={6} sm={8} xs={12}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card
              hoverable
              size="small"
              bordered={false}
              cover={
                <img
                  alt="example"
                  src="https://dummyimage.com/800x1000/5f9ea0/fff"
                />
              }
            >
              <span>{item.category?.name}</span>
              <h3 truncateMultiLine={2} style={{ height: 48 }}>
                {item.name}
              </h3>
              <h2 style={{ color: "#006363" }}>
                {item.price.toLocaleString()} ₫
              </h2>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col lg={6} xs={24}>
          <Card title="Filter" size="small" bordered={false}>
            {categoryList.loading ? (
              <Skeleton active />
            ) : (
              <Checkbox.Group
                onChange={(values) => handleFilter("categoryId", values)}
                value={filterParams.categoryId}
              >
                <Row>{renderCategoryList}</Row>
              </Checkbox.Group>
            )}
          </Card>
        </Col>
        <Col lg={18} xs={24}>
          <Card size="small" bordered={false}>
            <Row gutter={[16, 16]}>
              <Col md={16} xs={24}></Col>
              <Col md={8} xs={24} style={{ textAlign: "right" }}>
                <Space>
                  <Select
                    placeholder="Sắp xếp theo"
                    bordered={false}
                    onChange={(value) => handleFilter("sortOrder", value)}
                    value={filterParams.sortOrder}
                    allowClear
                    style={{ width: 130 }}
                  >
                    <Select.Option value="price.asc">
                      Giá tăng dần
                    </Select.Option>
                    <Select.Option value="price.desc">
                      Giá giảm dần
                    </Select.Option>
                  </Select>
                  <Segmented
                    options={[
                      {
                        value: "card",
                        icon: <AppstoreOutlined />,
                      },
                      {
                        value: "list",
                        icon: <BarsOutlined />,
                      },
                    ]}
                  />
                </Space>
              </Col>
            </Row>
          </Card>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {renderProductList}
          </Row>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Hiển thị thêm</Button>
            </Row>
          )}
        </Col>
      </Row>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
