import { useMemo } from "react";
import { Navigate, Link, Outlet, useLocation } from "react-router-dom";
import { Card, Row, Col, Breadcrumb, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { CameraOutlined, UserOutlined, HomeOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";
import { changeAvatarRequest } from "redux/slicers/auth.slice";
import { PROFILE_MENU } from "./constants";

import * as S from "./styles";

function Profile() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const accessToken = localStorage.getItem("accessToken");

  const handleChangeAvatar = async (e) => {};

  const renderProfileMenu = useMemo(() => {
    return PROFILE_MENU.map((item, index) => {
      return (
        <Link to={item.path} key={index} style={{ color: "black" }}>
          <S.ProfileMenuItem active={item.path === pathname}>
            <div>{item.icon}</div>
            <p style={{ marginLeft: 12 }}>{item.label}</p>
          </S.ProfileMenuItem>
        </Link>
      );
    });
  }, [pathname]);

  const profileLabel = useMemo(() => {
    return PROFILE_MENU.find((item) => item.path === pathname)?.label;
  }, [pathname]);

  if (accessToken && userInfo.loading) {
    return <div>Loading...</div>;
  } else if (!userInfo.data.id) {
    return <Navigate to={ROUTES.USER.HOME} />;
  }
  return (
    <S.ProfileWrapper>
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={ROUTES.USER.HOME}>
                <Space>
                  <HomeOutlined />
                  <span>Trang chủ</span>
                </Space>
              </Link>
            ),
          },
          {
            title: profileLabel,
          },
        ]}
        style={{ marginBottom: 8 }}
      />
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <S.ProfileMenuWrapper bordered={false} size="small">
            <S.AvatarContainer>
              <S.AvatarUpload>
                <S.AvatarEdit>
                  <input
                    type="file"
                    id="imageUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={(e) => handleChangeAvatar(e)}
                  />
                  <label for="imageUpload">
                    <CameraOutlined style={{ fontSize: 16 }} />
                  </label>
                </S.AvatarEdit>
                {userInfo.data.avatar ? (
                  <S.AvatarPreview
                    src={userInfo.data.avatar}
                    alt="User profile picture"
                  />
                ) : (
                  <S.AvatarDefaultWrapper>
                    <S.AvatarDefaultContainer
                      icon={<UserOutlined style={{ fontSize: 36 }} />}
                    />
                  </S.AvatarDefaultWrapper>
                )}
              </S.AvatarUpload>
              <h3>Thanh Tuan</h3>
              <p>tuan@gmail.com</p>
            </S.AvatarContainer>
            <S.ProfileMenuContainer>{renderProfileMenu}</S.ProfileMenuContainer>
          </S.ProfileMenuWrapper>
        </Col>
        <Col md={18}>
          <Card bordered={false} size="small" title={profileLabel}>
            <Outlet />
          </Card>
        </Col>
      </Row>
    </S.ProfileWrapper>
  );
}

export default Profile;
