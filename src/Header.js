import React from 'react';
import { Button } from 'react-bootstrap';

import { Header as HeaderStyled, Title } from "./styled";

const Header =({toggleMenu}) => (
    <HeaderStyled>
      <Title>Graph Creator</Title>
      <Button onClick={toggleMenu} variant="success">Create Node</Button>
    </HeaderStyled>
);

export default React.memo(Header);