import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
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
} from "redux/slicers/product.slice";

function* getProductListSaga(action) {
  try {
    const { page, limit, categoryId, sortOrder, searchKey, more } =
      action.payload;
    const result = yield axios.get("http://localhost:4000/products", {
      params: {
        _expand: "category",
        _page: page,
        _limit: limit,
        categoryId: categoryId,
        q: searchKey,
        ...(sortOrder && {
          _sort: sortOrder.split(".")[0],
          _order: sortOrder.split(".")[1],
        }),
        isDelete: false,
      },
    });
    yield put(
      getProductListSuccess({
        data: result.data,
        meta: {
          page: page,
          limit: limit,
          total: parseInt(result.headers["x-total-count"]),
        },
        more,
      })
    );
  } catch (e) {
    yield put(getProductListFailure({ error: "Lỗi" }));
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: "category",
        _embed: "favorites",
        isDelete: false,
      },
    });
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFailure({ error: "Lỗi" }));
  }
}

function* createProductSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", data);
    yield callback();
    yield put(createProductSuccess({ data: result.data }));
  } catch (e) {
    yield put(createProductFailure({ error: "Lỗi" }));
  }
}

function* deleteProductSaga(action) {
  try {
    const { id, ...productListParams } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/products/${id}`, {
      isDelete: true,
    });
    yield put(getProductListRequest(productListParams));
    yield put(deleteProductSuccess({ data: result.data }));
  } catch (e) {
    yield put(deleteProductFailure({ error: "Lỗi" }));
  }
}

export default function* productSaga() {
  yield takeEvery(getProductListRequest, getProductListSaga);
  yield takeEvery(getProductDetailRequest, getProductDetailSaga);
  yield takeEvery(createProductRequest, createProductSaga);
  yield takeEvery(deleteProductRequest, deleteProductSaga);
}
