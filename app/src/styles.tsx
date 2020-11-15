import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

import { mainColor } from './constants';

export const GlobalStyle = createGlobalStyle`
  body {
    user-select: none;
    margin: 0;
    padding: 0;
  }
`;

export const AdminBadge = styled.span`
  color: #ffffff;
  background-color: #ff0000;
  padding: 0 6px;
  margin-left: 10px;
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
  margin: 25vh auto;
  background-color: #eeeeee;
  max-width: 90%;
  box-sizing: border-box;
`;

export const Button = styled.button`
  padding: 4px 8px;
  width: fit-content;
  box-sizing: border-box;
  max-width: 100%;
  background-color: ${mainColor};
  border: none;
  color: #ffffff;
  font-family: 'Consolas', sans-serif;
  font-size: 16px;
  cursor: pointer;
  
  &:disabled,
  &[disabled] {
    background-color: #bbbbbb;
    cursor: context-menu;
  }
`;

export const ButtonRed = styled(Button)`
  background-color: #ff0000;
`;

export const Error = styled.div`
  padding: 6px 10px;
  width: 100%;
  background-color: #ff0000;
  color: #ffffff;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 4px 8px;
  box-sizing: border-box;
  width: 100%;
  background-color: #ffffff;
  border: none;
  color: #000000;
  font-family: 'Consolas', sans-serif;
  font-size: 16px;
  margin-top: 5px;
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
  text-decoration: none;
  
  &:hover {
    color: #000000;
  }
`;

export const NavigationLinkRight = styled(NavigationLink)`
  float: right;
  margin-right: 0;
  
  &:last-child {
    margin-right: 12px;
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
  border-bottom: 4px solid ${mainColor};
  width: fit-content;
`;

export const UserNavigation = styled.div`
  padding: 10px 15px;
  background-color: #ffffff;
  color: ${mainColor};
  width: 100%;
  box-sizing: border-box;
`;

export const UserNavigationLink = styled(Link)`
  color: #000000;
  margin-right: 12px;
  text-decoration: none;
  
  &:hover {
    color: #000000;
  }
  
  &:last-child {
    margin-right: 0;
  }
`;

export const UserNavigationName = styled.span`
  color: #ffffff;
  float: right;
  background-color: ${mainColor};
  padding: 0 6px;
`;