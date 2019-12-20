import React from 'react';
import styled from 'styled-components';
import { Search, Songs } from './components';

const App = () => (
  <Container>
    <Search />
    <Songs />
  </Container>
);

export default App;

const Container = styled.main`
  padding: 40px 80px;
  text-align: center;
`;
