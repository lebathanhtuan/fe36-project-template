import { useState, useEffect, useMemo } from "react";
import { Input } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import qs from "qs";

import { ROUTES } from "constants/routes";
import { getCategoryListRequest } from "redux/slicers/category.slice";

import * as S from "./styles";

function Header() {
  const [searchKey, setSearchKey] = useState("");

  const { search } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListRequest());
  }, []);

  useEffect(() => {
    const searchParams = qs.parse(search, { ignoreQueryPrefix: true });
    setSearchKey(searchParams.searchKey || "");
  }, [search]);

  const handleSearchKeyword = (e) => {
    if (e.key === "Enter") {
      const searchParams = qs.parse(search, { ignoreQueryPrefix: true });
      const newFilterParams = {
        categoryId: searchParams.categoryId
          ? searchParams.categoryId.map((id) => parseInt(id))
          : [],
        sortOrder: searchParams.sortOrder,
        searchKey: searchKey,
      };
      navigate({
        pathname: ROUTES.USER.PRODUCT_LIST,
        search: qs.stringify(newFilterParams),
      });
    }
  };

  const renderNavLink = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Link
          to={{
            pathname: ROUTES.USER.PRODUCT_LIST,
            search: qs.stringify({
              categoryId: [item.id],
            }),
          }}
          key={item.id}
          style={{ textDecoration: "none" }}
        >
          <S.NavLinkItem>
            <h4>{item.name}</h4>
          </S.NavLinkItem>
        </Link>
      );
    });
  }, [categoryList.data]);

  return (
    <S.HeaderWrapper>
      <S.HeaderTopWrapper>
        <Link to={ROUTES.USER.HOME}>
          <h2>Logo</h2>
        </Link>
        <S.SearchContainer>
          <Input
            size="large"
            placeholder="Tìm kiếm"
            allowClear
            prefix={<SearchOutlined />}
            onChange={(e) => setSearchKey(e.target.value)}
            onKeyDown={(e) => handleSearchKeyword(e)}
            value={searchKey}
            style={{ width: 400 }}
          />
        </S.SearchContainer>
        <h2>{userInfo.data.fullName}</h2>
      </S.HeaderTopWrapper>
      <S.HeaderBottomWrapper>
        <S.NavLinkContainer>{renderNavLink}</S.NavLinkContainer>
      </S.HeaderBottomWrapper>
    </S.HeaderWrapper>
  );
}

export default Header;
