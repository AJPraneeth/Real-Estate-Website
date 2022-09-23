import React from "react";
import {
  Container,
  Head,
  Body,
  Row,
  Data,
  Button,
  Anchor,
  AnchorRed,
  ButtonRed

} from "./styles/table";

const Table = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

Table.Head = ({ children, ...restProps }) => {
  return <Head {...restProps}>{children}</Head>;
};

Table.Body = ({ children, ...restProps }) => {
  return <Body {...restProps}>{children}</Body>;
};

Table.Row = ({ children, ...restProps }) => {
  return <Row {...restProps}>{children}</Row>;
};

Table.Data = ({ children, ...restProps }) => {
  return <Data {...restProps}>{children}</Data>;
};

Table.Button = ({ children, ...restProps }) => {
  return <Button {...restProps}>{children}</Button>;
};
Table.ButtonRed = ({ children, ...restProps }) => {
  return <ButtonRed {...restProps}>{children}</ButtonRed>;
};


Table.Anchor = ({ children, to, ...restProps }) => {
  return (
    <Anchor to={to} {...restProps}>
      {children}
    </Anchor>
  );
};
Table.AnchorRed = ({ children, to, ...restProps }) => {
  return (
    <AnchorRed to={to} {...restProps}>
      {children}
    </AnchorRed>
  );
};

export default Table;
