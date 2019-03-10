import React from 'react';
import StockList from '../StockList/StockList';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    this.setState(() => ({
      // stocks: this.getMyStocks();
      stocks: this.mockStocks()
    }));
  }

  mockStocks() {
    return [
      'GOOGL',
      'AAPL',
      'MSFT',
      'BIP',
      'ADBE',
      'CSCO',
      'DAL',
      'DIS',
      'SHMP',
      'EOG'
    ]
  }

  getMyStocks() {
    const stockEndPoint =
      'https://stockwatch-api.shropnet.net/jsonapi/node/stock';

    fetch(stockEndPoint)
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          return result.data
        } else {
          return [];
        }
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
