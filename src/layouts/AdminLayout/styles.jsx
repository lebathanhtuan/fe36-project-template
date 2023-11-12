import styled from "styled-components";

export const MainWrapper = styled.div`
  flex: 1;
  margin-top: 56px;
  margin-left: 250px;
  padding: 16px;
  transition: all 0.4s;

  ${(props) =>
    props.isFull &&
    `
    margin-left: 0;
  `}
`;
