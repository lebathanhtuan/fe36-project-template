import { useState } from "react";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

import { ROUTES } from "constants/routes";

import * as S from "./styles";

function Header() {
  const [keyword, setKeyword] = useState("");

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
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
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
