import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StockItemDetails from '../StockItemDetails/StockItemDetails';
import './StockItem.scss';
import axios from 'axios';

class StockItem extends Component {
  constructor() {
    super();
    this.state = {
      stockData: {},
      showFullDetails: false
    }

    this.getStockData = this.getStockData.bind(this);
    this.showFullDetails = this.showFullDetails.bind(this);
  }

  showFullDetails() {
    const stockRow = ReactDOM.findDOMNode(this.refs.stockItem);
    stockRow.classList.add('active-stock');
    this.setState(() => ({
      showFullDetails: true
    }));
  }

  getStockData(symbol) {
    // Reach out to API and fetch details.
    const token = 'pk_3d12c4e90ede4d44a066ab6573730347';
    const endpoint = `https://cloud.iexapis.com`;
    const stockData = endpoint + `/beta/stock/${symbol}/quote?token=${token}`;

    let self = this;
    axios.get(stockData)
      .then(function (response) {
        self.setState(() => ({
          stockData: response.data
        }));
      })
      .catch(function (error) {
        console.log(error, 'The error');
      });
  }

  componentDidMount() {
    // Get stock data from API on load for current stock.
    this.getStockData(this.props.stock);
  }

  render() {
    let stockFullDetails;
    if (this.state.showFullDetails) {
      stockFullDetails = (
        <StockItemDetails stock={this.props.stock} />
      );
    } else {
      stockFullDetails = null;
    }
    console.log(this.state.stockData);

    return (
      <div className="stock__item-wrapper" ref="stockItem">
        <div className="stock__item">
          <div className="stock__company-info">
            <div className="stock__symbol">{this.state.stockData.symbol}</div>
            <div className="stock__name">
              {this.state.stockData.companyName}
            </div>
          </div>

          <div className="stock__stock-price">
            <div className="stock__symbol">
              {this.state.stockData.latestPrice}
            </div>
            <div className="stock__item-change">
            {this.state.stockData.changePercent}% / {this.state.stockData.change}
            </div>
          </div>

          <div className="stock__see-details">
            <button onClick={this.showFullDetails}>Buy</button>
          </div>
        </div>

        {stockFullDetails}
      </div>
    );
  }
}

export default StockItem;
