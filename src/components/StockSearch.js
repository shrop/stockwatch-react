import React, { Component } from 'react';
import '../App.css';
import JsonApi from 'devour-client'

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

    const searchStock = this.state.searchedStock;
    fetch('https://stockwatch-api.shropnet.net/jsonapi/node/stock')
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
          <ul className="stock-search__results-list">
            {this.state.matchingStocks.map((stock) => {
              return (
                <li key={stock.symbol}>
                  {stock.name} - {stock.price}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default StockSearch;
