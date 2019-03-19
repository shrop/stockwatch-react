import React from 'react';
import PropTypes from 'prop-types';
import ReactHighstock from 'react-highcharts/ReactHighstock.src';
import './StockItemDetails.scss';
import {StockAPI} from '../StockAPI/StockAPI.js';
import axios from 'axios';

class StockItemDetails extends React.Component {
  constructor() {
    super();

    this.state = {
      stockDetails: [],
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
      ],
      totalCost: '$0.00',
      stockAmount: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    let self = this;
    StockAPI.getStockHistoryPromise(this.props.stock, this.state.stockRange).then(function(response) {
      // Store data in a way we can Chart it.
      const stockChartDetails = response.data.map((dataPoint) => {
        let Timestamp = (new Date(dataPoint.date).getTime());
        return [Timestamp, dataPoint.close];
      });

      self.setState(() => ({
        stockDetails: stockChartDetails
      }));
    })
  }

  handleChange(event){
    const value = event.target.value;
    if (isNaN(value)) {
      return false;
    } else {
      const totalCost = value * this.props.price;
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      this.setState({
        stockAmount: value,
        totalCost: formatter.format(totalCost)
      });
    }
  }

  handleSubmit(event){
    alert(`You have made a trade for ${this.state.stockAmount} of ${this.props.stock} stock`);
    event.preventDefault();

    const transaction = {
      type: 'node--transaction',
      attributes: {
        title: 'Stock Transaction by admin',
        stock_symbol: {
          value: this.props.stock
        },
        stock_price: this.state.price,
        stock_quantity: this.state.stockAmount
      }
    };

    const serverAPI = 'https://stockwatch-api.shropnet.net/api/node/transaction';

    axios({
      method: 'POST',
      headers: {
        "Content-Type": "application/vnd.api+json"
      },
      url: serverAPI,
      data: transaction
    })
    .then(function (response) {
        console.log(response, 'Post Response Good');
    })
    .catch(function (error) {
        console.log(error, 'Err Fail');
    });

  }

  render() {
    var chartConfig = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: `${this.props.stock} Stock Performance`
      },
      series: [{
        name: this.props.stock,
        data: this.state.stockDetails,
        tooltip: {
          valueDecimals: 2
        }
      }]
    };
    const stockPerformanceChart = <ReactHighstock config={chartConfig} />

    return (
      <div className="stock-item__details">
        <div className="row">
          <div className="stock-item__details-chart col-lg-8 col-md-6">
            { stockPerformanceChart }
          </div>

          <div className="col-lg-4 col-md-6">

            <form action="" className="form-horizontal" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="numberOfShares" className="col-xs-8">Shares of {this.props.stock}</label>
                <div className="col-xs-4">
                  <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} id="numberOfShares" placeholder="0" />
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-8">
                  <p>Market Price</p>
                </div>
                <div className="col-xs-4">
                  <p className="pull-right">{this.props.price}</p>
                </div>
              </div>

              <div className="form-group">
                <div className="col-xs-8">
                  <p>Cost</p>
                </div>
                <div className="col-xs-4">
                  <p className="pull-right">{this.state.totalCost}</p>
                </div>
              </div>
              <button type="submit" className="btn btn-success">Make Trade</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

StockItemDetails.propTypes = {
  stock: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}

export default StockItemDetails