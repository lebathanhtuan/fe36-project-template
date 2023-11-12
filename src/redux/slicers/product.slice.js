import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },
  productDetail: {
    data: {},
    loading: false,
    error: null,
  },
  createProductData: {
    loading: false,
    error: null,
  },
  updateProductData: {
    loading: false,
    error: null,
  },
  deleteProductData: {
    loading: false,
    error: null,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // getProductList
    getProductListRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.productList.data = more
        ? [...state.productList.data, ...data]
        : data;
      state.productList.meta = meta;
      state.productList.loading = false;
    },
    getProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.productList.loading = false;
      state.productList.error = error;
    },
    // getProductDetail
    getProductDetailRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.data = data;
      state.productDetail.loading = false;
    },
    getProductDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },
    // createProductRequest
    createProductRequest: (state, action) => {
      state.createProductData.loading = true;
      state.createProductData.error = null;
    },
    createProductSuccess: (state, action) => {
      state.createProductData.loading = false;
    },
    createProductFailure: (state, action) => {
      const { error } = action.payload;
      state.createProductData.loading = false;
      state.createProductData.error = error;
    },
    // updateProductRequest
    updateProductRequest: (state, action) => {
      state.updateProductData.loading = true;
      state.updateProductData.error = null;
    },
    updateProductSuccess: (state, action) => {
      state.updateProductData.loading = false;
    },
    updateProductFailure: (state, action) => {
      const { error } = action.payload;
      state.updateProductData.loading = false;
      state.updateProductData.error = error;
    },
    // deleteProductRequest
    deleteProductRequest: (state, action) => {
      state.deleteProductData.loading = true;
      state.deleteProductData.error = null;
    },
    deleteProductSuccess: (state, action) => {
      state.deleteProductData.loading = false;
    },
    deleteProductFailure: (state, action) => {
      const { error } = action.payload;
      state.deleteProductData.loading = false;
      state.deleteProductData.error = error;
    },
  },
});

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
  createProductRequest,
  createProductSuccess,
  createProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailure,
} = productSlice.actions;

export default productSlice.reducer;
