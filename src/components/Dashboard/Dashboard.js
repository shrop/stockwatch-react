import React from 'react';
import StockList from '../StockList/StockList';
import {DrupalAPI} from '../DrupalAPI/DrupalAPI.js';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: []
    };

    this.getMyStocks = this.getMyStocks.bind(this);
  }

  componentDidMount() {
    this.getMyStocks();
  }

  getMyStocks() {
    const self = this;
    const stockPromise = DrupalAPI.getMyStocksPromise();
    stockPromise.then(function( response ){
      console.log(response, 'Stocks: My Data');

      const myStocks = response.data.data.map((myStock) => (
        myStock.attributes.stock_symbol.value
      ));

      self.setState(() => ({
        stocks: myStocks
      }));
    });
  }

  render() {
    // If there any stocks, list them, otherwise show empty message.
    let displayStocks;
    if (this.state.stocks.length) {
      displayStocks = <StockList stocks={this.state.stocks} />
    } else {
      displayStocks = <p>You don't have any stocks in your portfolio.</p>
    }

    return (
      <div className="container">
        <div className="page__title">
          <h1>Dashboard</h1>
        </div>

        {displayStocks}

      </div>
    );
  }
}

export default Dashboard;
