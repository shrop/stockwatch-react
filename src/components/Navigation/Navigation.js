import React from 'react';
import PropTypes from 'prop-types';

/**
 * Will eventually be removed. Logic has moved to Router file.
 */

// Create the links for the navigation.
const navigationLinks = {
  links: [
    {
      path: '/dashboard',
      needsAuth: true,
      text: 'Dashboard'
    },
    {
      path: '/stock-search',
      needsAuth: true,
      text: 'Search'
    },
    {
      path: '/log-out',
      needsAuth: true,
      text: 'Log Out'
    },
    {
      path: '/',
      needsAuth: false,
      text: 'Home'
    },
    {
      path: '/log-in',
      needsAuth: false,
      text: 'Log In'
    }
  ],
};

class Navigation extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {navigationLinks.links.map((link, index) => {
          // Render Links based on whether the user is logged in or not.
          if (link.needsAuth === this.props.isLoggedIn()) {
            // Adds 'active' class to the navigation item if the passed in
            // props matches a link in the Nav array.
            if (this.props.match.url === link.path) {
              return (
                <li key={index} className="active" href={link.path}>
                  {link.text}
                </li>
              );
            } else {
              return (
                <li key={index} href={link.path}>
                  {link.text}
                </li>
              );
            }
          } else {
            return false;
          }
        })}
      </div>
    );
  }
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.func.isRequired,
  match: PropTypes.string.isRequired
}

export default Navigation;
