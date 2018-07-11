import React, { Component } from 'react';
import '../App.css';
import logoImage from '../assets/logo.svg';

class Logo extends Component {

  render() {
    return (
      <img src={logoImage} alt="Stockwatch Logo" />
    );
  }
}

export default Logo;
