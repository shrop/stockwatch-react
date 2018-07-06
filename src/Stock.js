import React, { Component } from 'react';
import './App.css';

class Stock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      symbols: []
    };
  }

  componentWillMount() {
    this.getStocks();
  }

  getStocks() {
    this.setState({
      symbols: 'AAPL'
    });
  }

  render() {
    return (
      <div className="Stock">
        <p>
          {this.state.symbols}
        </p>
      </div>
    );
  }
}

export default Stock;
