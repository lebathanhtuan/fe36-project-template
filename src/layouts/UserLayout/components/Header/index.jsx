import { useState, useEffect } from "react";
import { Input } from "antd";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import qs from "qs";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function Header() {
  const [searchKey, setSearchKey] = useState("");

  const { search } = useLocation();
  const navigate = useNavigate();

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
      </S.HeaderTopWrapper>
      <S.HeaderBottomWrapper>
        <S.NavLinkContainer>ABC</S.NavLinkContainer>
      </S.HeaderBottomWrapper>
    </S.HeaderWrapper>
  );
}

export default Header;
