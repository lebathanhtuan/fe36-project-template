import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
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
          _sort: "price",
          _order: sortOrder,
        }),
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
      },
    });
    yield put(getProductDetailSuccess({ data: result.data }));
  } catch (e) {
    yield put(getProductDetailFailure({ error: "Lỗi" }));
  }
}

export default function* productSaga() {
  yield takeEvery(getProductListRequest, getProductListSaga);
  yield takeEvery(getProductDetailRequest, getProductDetailSaga);
}
