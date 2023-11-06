import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

import UserLayout from "layouts/UserLayout";
import AdminLayout from "layouts/AdminLayout";

import HomePage from "pages/user/Home";
import ProductListPage from "pages/user/ProductList";
import ProductDetailPage from "pages/user/ProductDetail";
import CartPage from "pages/user/Cart";

import DashboardPage from "pages/admin/Dashboard";

import LoginPage from "pages/Login";
import RegisterPage from "pages/Register";

import { ROUTES } from "constants/routes";
import { getUserInfoRequest } from "redux/slicers/auth.slice";
import { light, dark } from "themes";

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
        </Route>
        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
        </Route>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
