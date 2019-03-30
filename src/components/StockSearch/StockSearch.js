import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StockItem from '../StockItem/StockItem';
import Autosuggest from 'react-autosuggest';
import {StockAPI} from '../StockAPI/StockAPI.js';
import './StockSearch.scss';

class StockSearch extends Component {
  constructor(props) {
    super(props);
    // this.stockEndPoint =
    //   'https://stockwatch-api.shropnet.net/jsonapi/node/stock';

    this.allStockSymbols = [];

    this.state = {
      searchedStock: '',
      matchingStocks: [],
      value: '',
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchStock = this.fetchStock.bind(this);
  }

  componentDidMount() {
    let self = this;
    StockAPI.getAllSymbolsPromise().then(function(response) {
      self.allStockSymbols = response.data;
    })
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      searchedStock: newValue,
    });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    return suggestion.symbol;
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // Only render solutions when the user has typed more than 2 characters.
  shouldRenderSuggestions = (value) => {
    return value.trim().length > 2;
  }

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    <div className="stocksearch__suggestion">
      <div className="stock-search__suggestion-name">{suggestion.name}</div>
      <div className="stock-search__suggestion-symbol">{suggestion.symbol}</div>
    </div>
  );

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    // When a suggestion is selected with the mouse or keyboard,
    // we are submitting the form manually so that the stock data is fetched.
    // Set the value of the stocksearch form input.
    this.refs.stocksearch.stock_search.value = suggestionValue;

    // Trigger a manual submit of the form in such a way that the onClick
    // handler is also fired.
    ReactDOM.findDOMNode(this.refs.stocksearch).dispatchEvent(new Event('submit'));

  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (query) => {
    let pool = this.allStockSymbols;

    const inputValue = query.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : pool.filter(symb =>
      symb.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  fetchStock(event) {
    event.preventDefault();

    let symbol = event.target.stock_search.value;
    let self = this;
    StockAPI.getStockInfoPromise(symbol).then(function (response) {
      self.setState({
        matchingStocks: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Search by company name',
      value,
      name: "stock_search",
      onChange: this.handleChange,
      className: "form-control"
    };

    let stockDetail = null;
    if (this.state.matchingStocks.length !== 0) {
      stockDetail = (
        <div className="stock-search__results">
          <StockItem
            key={this.state.matchingStocks.symbol}
            stock={this.state.matchingStocks.symbol}
            notification={this.props.notification} />
        </div>
      );
    }

    return (
      <div className="container">
        <h1>Stock Search</h1>
        <form className="stock-search__form" onSubmit={this.fetchStock} ref="stocksearch">
          <div className="form-group">
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
              onSuggestionSelected={this.onSuggestionSelected}
              shouldRenderSuggestions={this.shouldRenderSuggestions}
            />
          </div>
        </form>

        {stockDetail}

      </div>
    );
  }
}

export default StockSearch;
