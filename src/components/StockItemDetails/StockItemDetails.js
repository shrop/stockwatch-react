import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class StockItemDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      stockDetails: {},
      stockRange: '3m',
      stockRangeOptions: [
        '5y',
        '2y',
        '1y',
        'ytd',
        '6m',
        '3m',
        '1m',
        '1d'
      ]
    };

    this.getDetailsInfo = this.getDetailsInfo.bind(this);
  }
  componentDidMount() {
    this.getDetailsInfo(this.props.stock);
  }

  getDetailsInfo(stock) {
    // Getting freebie info from https://api.iextrading.com/1.0/
    // Options: /5y, /2y, /1y, /ytd, /6m, /3m, /1m, /1d.
    const stockInfoEndpoint = 'https://api.iextrading.com/1.0';
    const stockInfoChartDataEndpoint = stockInfoEndpoint + `/stock/${stock}/chart/dynamic`;
    const stockInfoChartDataRange = stockInfoChartDataEndpoint + `/${this.state.stockRange}`;

    console.log(stockInfoChartDataRange, 'Chart endpoint');
    let self = this;
    axios.get(stockInfoChartDataRange)
      .then(function (response) {
        self.setState(() => ({
          stockDetails: response.data
        }));
      })
      .catch(function (error) {
        console.log(error, 'The error');
      });
  }

  render() {
    console.log(this.state.stockDetails, 'Stock Deets');
    return <div>Stock Item Deets yo for {this.props.stock}</div>;
  }
}

StockItemDetails.propTypes = {
  stock: PropTypes.string.isRequired
}

export default StockItemDetails