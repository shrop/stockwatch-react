import React, { Component } from 'react';
import '../App.css';
import logoImage from '../assets/logo.svg';
import logoImageInline from '../assets/logo-inline.svg';
import logoImageMark from '../assets/logo-mark.svg';

class Logo extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let logoPath;
    if (this.props.style === 'mark') {
      logoPath = logoImageMark
    }
    else if (this.props.style === 'inline') {
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
