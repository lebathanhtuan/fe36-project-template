import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "constants/routes";

function AdminLayout() {
  const { userInfo } = useSelector((state) => state.auth);
  const accessToken = localStorage.getItem("accessToken");

  // if (!accessToken) {
  //   return <Navigate to={ROUTES.USER.HOME} />;
  // } else {
  //   if (userInfo.loading) {
  //     return <div>Loading...</div>;
  //   } else {
  //     if (userInfo.data.role === "admin") {
  //       return (
  //         <div id="admin">
  //           <Outlet />
  //         </div>
  //       );
  //     } else {
  //       return <Navigate to={ROUTES.USER.HOME} />;
  //     }
  //   }
  // }

  if (accessToken && userInfo.loading) {
    return <div>Loading...</div>;
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  } else {
    return (
      <div id="admin">
        <Outlet />
      </div>
    );
  }
}

export default AdminLayout;
