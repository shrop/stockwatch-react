import React, { Component } from 'react';
import '../App.css';
import logoImage from '../assets/logo.svg';
import logoImageInline from '../assets/logo-inline.svg';
import { css } from 'emotion'
import logoImageMark from '../assets/logo-mark.svg';

const logoStyles = css`
  max-width: 100%;
`

class Logo extends Component {
  render() {
    let logoPath;
    if (this.props.logoStyle === 'mark') {
      logoPath = logoImageMark
    }
    else if (this.props.logoStyle === 'inline') {
      logoPath = logoImageInline
    }
    else {
      logoPath = logoImage
    }

    return (
      <img className={logoStyles + ' stockwatch-logo'} src={logoPath} alt="Stockwatch Logo" />
    );
  }
}

export default Logo;
