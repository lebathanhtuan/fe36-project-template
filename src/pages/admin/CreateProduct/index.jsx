import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Select, InputNumber, Space, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import slugify from "slugify";

import { ROUTES } from "constants/routes";
import { createProductRequest } from "redux/slicers/product.slice";
import { getCategoryListRequest } from "redux/slicers/category.slice";
// import { convertImageToBase64 } from "utils/file";

import * as S from "./styles";

const CreateProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createForm] = Form.useForm();

  const { categoryList } = useSelector((state) => state.category);
  const { createProductData } = useSelector((state) => state.product);

  const initialValues = {
    name: "",
    price: undefined,
    categoryId: undefined,
    content: "",
  };

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

  const handleCreateProduct = async (values) => {
    dispatch(
      createProductRequest({
        data: {
          ...values,
          slug: slugify(values.name),
        },
        callback: () => navigate(ROUTES.ADMIN.PRODUCT_MANAGER),
      })
    );
  };

  const renderProductOptions = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <h3>Create Product</h3>
        <Button
          type="primary"
          loading={createProductData.load}
          onClick={() => createForm.submit()}
        >
          Create
        </Button>
      </S.TopWrapper>
      <Form
        form={createForm}
        layout="vertical"
        initialValues={initialValues}
        onFinish={(values) => handleCreateProduct(values)}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Category"
          name="categoryId"
          rules={[{ required: true, message: "Required!" }]}
        >
          <Select>{renderProductOptions}</Select>
        </Form.Item>
        <Space>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Required!" }]}
          >
            <InputNumber
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              style={{ width: 200 }}
            />
          </Form.Item>
          <span>VND</span>
        </Space>
        <Form.Item label="Content" name="content">
          <ReactQuill
            theme="snow"
            onChange={(value) => {
              createForm.setFieldsValue({ content: value });
            }}
          />
        </Form.Item>
      </Form>
    </S.Wrapper>
  );
};

export default CreateProductPage;
