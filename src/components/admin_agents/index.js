import React from "react";

import { Container, Content,Button,Anchor } from "./styles/admin_agents";

const AdminAgents = ({ children, ...restProps }) => {
  return <Container {...restProps}>{children}</Container>;
};

AdminAgents.Content = ({ children, ...restProps }) => {
  return <Content {...restProps}>{children}</Content>;
};

AdminAgents.Button = ({ children, bg, ...restProps }) => {
  return (
    <Button bg={bg} {...restProps}>
      {children}
    </Button>
  );
};

AdminAgents.Anchor = ({ children, to, ...restProps }) => {
  return (
    <Anchor to={to} {...restProps}>
      {children}
    </Anchor>
  );
};

export default AdminAgents;
