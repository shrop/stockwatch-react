import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Logo from './Logo';
import { css } from 'emotion';

const headerLogo = css`
  width: 58px;
  height: 53px;
  padding: 5px;
`;

class Navigation extends React.Component {
  constructor() {
    super();

    this.state = {
      links: [
        {
          path: '/dashboard',
          permission: 'auth',
          text: 'Dashboard'
        },
        {
          path: '/stock-search',
          permission: 'auth',
          text: 'Search'
        },
        {
          path: '/log-out',
          permission: 'auth',
          text: 'Log Out'
        },
        {
          path: '/log-in',
          permission: 'anon',
          text: 'Log In'
        }
      ],
      userState: 'auth'
    };
  }
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/" className={headerLogo}>
              <Logo logoVariant="mark" />
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          {this.state.links.map((link, index) => {
            {
              if (link.permission == this.state.userState) {
                return (
                  <NavItem key={index} href={link.path}>
                    {link.text}
                  </NavItem>
                );
              }
            }
          })}
        </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
