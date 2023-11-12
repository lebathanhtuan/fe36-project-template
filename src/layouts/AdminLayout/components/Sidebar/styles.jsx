import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const SidebarWrapper = styled.div`
  position: absolute;
  left: -250px;
  margin-top: 56px;
  padding: 8px;
  width: 250px;
  height: calc(100% - 56px);
  background-color: #14bbbb;
  overflow: hidden;
  transition: all 0.4s;

  ${(props) =>
    props.isShow &&
    css`
      left: 0;
    `}
`;

export const SidebarItem = styled(Link)`
  display: block;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  color: black;
  cursor: pointer;

  &:hover {
    background-color: #ff5e5d;
    color: white;
  }

  ${(props) =>
    props.active &&
    css`
      background-color: red;
      color: white;
    `}
`;
