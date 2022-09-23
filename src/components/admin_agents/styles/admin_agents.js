import styled from "styled-components/macro";
import { Link } from "react-router-dom";
const Container = styled.div``;

const Content = styled.div`
  overflow-x: auto;
`;
const Anchor = styled(Link)``;
const Button = styled.button`
  padding: 16px 20px;
  text-align: center;
  border: none;
  outline: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  margin-right: 20px;
  background-color: ${({ bg }) => bg};
  ${Anchor} {
    color: white;
  }
`;

export { Container, Content,Button,Anchor };
