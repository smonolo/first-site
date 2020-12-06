import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'react-router-dom';

const mainColor: string = '#008cff';

const theme = localStorage.getItem('theme');
const light = !theme || theme !== 'dark';

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Consolas', sans-serif;
  }

  body {
    user-select: none;
    margin: 0;
    padding: 0;
    background-color: ${light ? '#ffffff' : '#000000'};
  }
  
  ::-webkit-scrollbar {
    width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    background-color: ${light ? '#999999' : '#333333'};
  }
  
  ::-webkit-scrollbar-thumb {
    background-color: ${mainColor};
  }
`;

export const Badge = styled.span`
  margin-left: 10px;
  padding: 0 6px;
`;

export const AdminBadge = styled(Badge)`
  color: #ffffff;
  background-color: #ff0000;
`;

export const GreenBadge = styled(Badge)`
  color: #ffffff;
  background-color: #228b22;
`;

export const Anchor = styled.a`
  color: #ffffff;
  
  &:hover {
    color: #ffffff;
  }
`;

export const Container = styled.div`
  width: 700px;
  margin: 25vh auto;
  max-width: 90%;
  box-sizing: border-box;
`;

export const Box = styled.div`
  padding: 50px;
  width: 100%;
  background-color: ${light ? '#eeeeee' : '#222222'};
  box-sizing: border-box;
`;

export const Banner = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 10px 50px;
`;

export const RedBanner = styled(Banner)`
  background-color: #ff0000;
  color: #ffffff;
`;

export const NavBox = styled(Box)`
  padding: 30px 50px;
`;

export const Button = styled.button`
  padding: 4px 8px;
  width: fit-content;
  box-sizing: border-box;
  max-width: 100%;
  background-color: ${mainColor};
  border: none;
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  border-radius: 0;
  
  &:disabled,
  &[disabled] {
    background-color: #bbbbbb;
    cursor: context-menu;
  }
`;

export const ButtonRed = styled(Button)`
  background-color: #ff0000;
`;

export const Dropdown = styled.div`
  position: absolute;
  width: 200px;
  display: none;
  right: 0;
  background-color: ${light ? '#000000' : '#ffffff'};
  margin-top: 10px;
  padding: 5px;
`;

export const DropdownLink = styled(Link)`
  text-decoration: none;
`;

export const DropdownItem = styled.div<any>`
  width: 100%;
  box-sizing: border-box;
  color: ${light ? '#ffffff' : '#000000'};
  padding: 2px 5px;
  cursor: pointer;
  margin-bottom: ${(props: any) => props.noBottom ? '0' : '5px'};

  &:hover {
    background-color: ${(props: any) => props.logout ? '#ff0000' : (light ? '#ffffff' : '#000000')};
    color: ${(props: any) => props.logout ? '#ffffff' : (light ? '#000000' : '#ffffff')};
  }
`;

export const Error = styled.div`
  padding: 6px 10px;
  width: 100%;
  background-color: #ff0000;
  color: #ffffff;
  box-sizing: border-box;
  margin-bottom: 10px;
`;

export const Info = styled(Error)`
  background-color: ${mainColor};
`;

export const Input = styled.input`
  padding: 4px 8px;
  box-sizing: border-box;
  width: 100%;
  background-color: ${light ? '#ffffff' : '#222222'};
  border: none;
  color: ${light ? '#000000' : '#ffffff'};
  font-size: 16px;
  margin-top: 5px;
  border-radius: 0;
  
  &:active,
  &:focus {
    outline: none;
  }
`;

export const Mail = styled.a`
  color: #ffffff;
  
  &:hover {
    color: #ffffff;
  }
`;

export const NavigationContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;

export const NavigationLink = styled(Link)`
  color: ${light ? '#000000' : '#ffffff'};
  margin-right: 12px;
  text-decoration: none;
  
  &:hover {
    color: ${light ? '#000000' : '#ffffff'};
  }
`;

export const NavigationLinkBadge = styled(NavigationLink)`
  padding: 0 6px;
  background-color: ${light ? '#111111' : '#ffffff'};
  color: ${light ? '#ffffff' : '#000000'};
  
  &:hover {
    color: ${light ? '#ffffff' : '#000000'};
  }
`;

export const NavigationLinkRight = styled(NavigationLink)`
  float: right;
  margin-right: 0;
  
  &:last-child {
    margin-right: 12px;
  }
`;

export const NavigationLinkRightLogout = styled(NavigationLinkRight)`
  &:last-child {
    margin-right: 0;
  }
`;

export const Paragraph = styled.div`
  padding: 15px 20px;
  background-color: ${light ? '#222222' : '#444444'};
  color: #ffffff;
  width: 100%;
  box-sizing: border-box;
`;

export const ToolContainer = styled.div`
  padding: 20px;
  background-color: ${light ? '#ffffff' : '#111111'};
  width: 100%;
  box-sizing: border-box;
  color: ${light ? '#000000' : '#ffffff'};
`;

export const SearchInput = styled(Input)`
  margin-top: 0;
  background-color: ${light ? '#ffffff' : '#111111'};
  color: ${light ? '#000000' : '#ffffff'};
  border-radius: 0;
  padding: 8px 12px;
  
  &::placeholder {
    color: ${light ? '#777777' : '#cccccc'};
  }
  
  &:active,
  &:focus {
    outline: none;
  }
`;

export const Text = styled.div`
  font-size: 16px;
`;

export const Title = styled.div`
  border-bottom: 4px solid ${mainColor};
  width: fit-content;
  color: ${light ? '#000000' : '#ffffff'};
`;

export const UserNavigationName = styled.span`
  color: #ffffff;
  float: right;
  background-color: ${mainColor};
  padding: 0 6px;
  text-decoration: none;
  cursor: pointer;
`;