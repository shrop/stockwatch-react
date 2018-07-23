import React, { Component } from 'react';
import '../App.css';
import StockList from './StockList';

class StockSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedStock: '',
      matchingStocks: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchStocks = this.fetchStocks.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchedStock: event.target.value
    });
  }

  fetchStocks(event) {
    event.preventDefault();

    let searchStock = this.state.searchedStock;
    let stockEndPoint = 'https://stockwatch-api.shropnet.net/jsonapi/node/stock';
    let searchParams = 'filter[title][value]=' + searchStock + '&filter[title][operator]==';

    if (searchStock) {
      stockEndPoint = stockEndPoint + '?' + searchParams;
    }

    fetch(stockEndPoint)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result, 'Result')
          if (result.data) {
            this.setState({
              matchingStocks: result.data
            });
          }
          else {
            this.setState({
              matchingStocks: []
            });
          }
        }
      )
  }

  render() {
    console.log(this.state.matchingStocks);
    return (
      <div className="stock-search container">
        <h3>Stock Search</h3>
        <form className="stock-search__form" onSubmit={this.fetchStocks}>
          <input className="stock-search__form__input form-input" name="stock_search" type="text" placeholder="Search for stock(s) by symbol. E.g. AAPL,MSFT,VOD.L" value={this.state.searchedStock} onChange={this.handleChange} />
          <input className="stock-search__form__cta form-cta" type="submit" value="Submit" />
        </form>

        <div className="stock-search__results">
          <StockList stocks={this.state.matchingStocks} />
        </div>
      </div>
    );
  }
}

export default StockSearch;
