import React, { Component } from 'react';
import '../App.css';
import logoImage from '../assets/logo.svg';
import logoImageInline from '../assets/logo-inline.svg';
import logoImageMark from '../assets/logo-mark.svg';

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
      <img className="stockwatch-logo" src={logoPath} alt="Stockwatch Logo" />
    );
  }
}

export default Logo;
