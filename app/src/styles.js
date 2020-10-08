import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

export const GlobalStyle = createGlobalStyle`
  body {
    user-select: none;
    margin: 0;
    padding: 0;
  }
`;

export const Anchor = styled.a`
  color: #ffffff;
  
  &:hover {
    color: #ffffff;
  }
`;

export const Box = styled.div`
  padding: 50px 70px;
  width: 500px;
  margin-top: 25vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #eeeeee;
  max-width: 90%;
  box-sizing: border-box;
`;

export const Mail = styled.a`
  color: #ffffff;
  
  &:hover {
    color: #ffffff;
  }
`;

export const NavigationLink = styled(Link)`
  color: #000000;
  margin-right: 12px;
  
  &:hover {
    color: #000000;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

export const Paragraph = styled.div`
  padding: 15px 20px;
  background-color: #222222;
  color: #ffffff;
  width: 100%;
  box-sizing: border-box;
`;

export const Text = styled.div`
  font-family: 'Consolas', sans-serif;
  font-size: 16px;
`;

export const Title = styled.div`
  border-bottom: 4px solid #008cff;
  width: fit-content;
`;