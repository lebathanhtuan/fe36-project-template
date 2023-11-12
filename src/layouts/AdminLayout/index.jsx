import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function AdminLayout() {
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && userInfo.loading) {
    return <div>Loading...</div>;
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  return (
    <div className="wrapper">
      <Header
        isShowSidebar={isShowSidebar}
        setIsShowSidebar={setIsShowSidebar}
      />
      <div className="container">
        <Sidebar isShowSidebar={isShowSidebar} />
        <S.MainWrapper isFull={!isShowSidebar}>
          <Outlet />
        </S.MainWrapper>
      </div>
    </div>
  );
}

export default AdminLayout;
