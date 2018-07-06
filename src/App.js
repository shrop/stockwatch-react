import React, { Component } from 'react';
import './App.css';
import Stock from './Stock.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stockwatch</h1>
        </header>
        <p className="App-intro">
          <Stock />
        </p>
      </div>
    );
  }
}

export default App;
