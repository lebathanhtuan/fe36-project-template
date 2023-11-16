import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  getUserInfoRequest,
  getUserInfoSuccess,
  getUserInfoFailure,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,
  changeAvatarRequest,
  changeAvatarSuccess,
  changeAvatarFailure,
} from "redux/slicers/auth.slice";

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/login", data);
    yield localStorage.setItem("accessToken", result.data.accessToken);
    yield callback(result.data.user.role);
    yield put(loginSuccess({ data: result.data.user }));
  } catch (e) {
    yield put(loginFailure({ error: "Email hoặc mật khẩu không đúng" }));
  }
}

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield axios.post("http://localhost:4000/register", data);
    yield callback();
    yield put(registerSuccess());
  } catch (e) {
    yield put(
      registerFailure({
        error:
          e.response.data === "Email already exists"
            ? "Email đã tồn tại"
            : "Lỗi",
      })
    );
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/users/${id}`);
    yield put(getUserInfoSuccess({ data: result.data }));
  } catch (e) {
    yield put(getUserInfoFailure({ error: "Lỗi" }));
  }
}

function* updateUserInfoSaga(action) {
  try {
    const { id, data } = action.payload;
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, data);
    yield put(updateUserInfoSuccess({ data: result.data }));
  } catch (e) {
    yield put(updateUserInfoFailure({ error: "Lỗi" }));
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, data, callback } = action.payload;
    yield axios.post("http://localhost:4000/login", {
      email: data.email,
      password: data.password,
    });
    const result = yield axios.patch(`http://localhost:4000/users/${id}`, {
      password: data.newPassword,
    });
    callback();
    yield put(changePasswordSuccess({ data: result.data }));
  } catch (e) {
    yield put(changePasswordFailure({ error: "Lỗi" }));
  }
}

function* changeAvatarSaga(action) {
  try {
    const { id, avatar } = action.payload;
    yield axios.patch(`http://localhost:4000/users/${id}`, { avatar: avatar });
    yield put(changeAvatarSuccess({ avatar: avatar }));
  } catch (e) {
    yield put(changeAvatarFailure({ error: "Lỗi" }));
  }
}

export default function* authSaga() {
  yield takeEvery(loginRequest, loginSaga);
  yield takeEvery(registerRequest, registerSaga);
  yield takeEvery(getUserInfoRequest, getUserInfoSaga);
  yield takeEvery(updateUserInfoRequest, updateUserInfoSaga);
  yield takeEvery(changePasswordRequest, changePasswordSaga);
  yield takeEvery(changeAvatarRequest, changeAvatarSaga);
}
