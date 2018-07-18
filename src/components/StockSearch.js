import React, { Component } from 'react';
import '../App.css';
import { css } from 'emotion'

const stockList = css`
  padding: 0;
`

const stockItem = css`
  display: block;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #d9d9d9;
`
const stockPrice = css`
  color: #ffffff;
  background: #34CA6E;
  padding: 0.5rem;
  border-radius: 5px;
  float: right;
`
const stockTitle = css`
  color: #444444;
  font-size: 1.5rem;
`
const stockName = css`
  color: #999999;
  font-size: 0.8rem;
`

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
          <ul className={stockList}>
            {this.state.matchingStocks.map((stock) => {
              return (
                <li className={stockItem} key={stock.id}>
                  <div className={stockPrice}>{stock.attributes.stock_price}</div>
                  <div className={stockTitle}>{stock.attributes.title}</div>
                  <div className={stockName}>{stock.attributes.company_name}</div>
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
