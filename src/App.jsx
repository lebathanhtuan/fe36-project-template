import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import UserLayout from "layouts/UserLayout";
import AdminLayout from "layouts/AdminLayout";
import ProfileLayout from "layouts/ProfileLayout";

import HomePage from "pages/user/Home";
import ProductListPage from "pages/user/ProductList";
import ProductDetailPage from "pages/user/ProductDetail";
import CartPage from "pages/user/Cart";
import CheckoutPage from "pages/user/Checkout";
import UserInfoPage from "pages/user/UserInfo";
import OrderHistoryPage from "pages/user/OrderHistory";
import ChangePasswordPage from "pages/user/ChangePassword";

import DashboardPage from "pages/admin/Dashboard";
import ProductManagerPage from "pages/admin/ProductManager";
import CreateProductPage from "pages/admin/CreateProduct";

import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";

import { ROUTES } from "constants/routes";
import { getUserInfoRequest } from "redux/slicers/auth.slice";
import { light, dark } from "themes";
import "App.css";

function App() {
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const { theme } = useSelector((state) => state.common);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const tokenData = jwtDecode(accessToken);
      dispatch(
        getUserInfoRequest({
          id: parseInt(tokenData.sub),
        })
      );
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path={ROUTES.USER.HOME} element={<HomePage />} />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.USER.CART} element={<CartPage />} />
          <Route path={ROUTES.USER.CHECKOUT} element={<CheckoutPage />} />
          <Route element={<ProfileLayout />}>
            <Route
              path={ROUTES.USER.PROFILE}
              element={<Navigate to={ROUTES.USER.USER_INFO} />}
            />
            <Route path={ROUTES.USER.USER_INFO} element={<UserInfoPage />} />
            <Route
              path={ROUTES.USER.ORDER_HISTORY}
              element={<OrderHistoryPage />}
            />
            <Route
              path={ROUTES.USER.CHANGE_PASSWORD}
              element={<ChangePasswordPage />}
            />
          </Route>
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
          <Route
            path={ROUTES.ADMIN.PRODUCT_MANAGER}
            element={<ProductManagerPage />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<CreateProductPage />}
          />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
