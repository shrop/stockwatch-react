import React, { Component } from 'react';
import logoImage from '../../assets/logo.svg';
import logoImageInline from '../../assets/logo-inline.svg';
import logoImageMark from '../../assets/logo-mark.svg';
import { css } from 'emotion';

let logoStyles = css`
  max-width: 100%;
`;

class Logo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoPath: logoImage,
      logoAlt: 'StockWatch App - Drupal Contenta Demo'
    };

    // Select the correct size logo based on what prop value is passed in
    // for 'logoVariant'.
    if (this.props.logoVariant === 'mark') {
      this.state.logoPath = logoImageMark;
    } else if (this.props.logoVariant === 'inline') {
      this.state.logoPath = logoImageInline;
    }
  }
  render() {
    return (
      <img
        className={logoStyles + ' stockwatch-logo'}
        src={this.state.logoPath}
        alt={this.state.logoAlt}
      />
    );
  }
}

export default Logo;
