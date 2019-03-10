import React, { Component } from 'react';
import StockList from '../StockList/StockList';
import StockItem from '../StockItem/StockItem';
import Navigation from '../Navigation/Navigation';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

/**
 * LOTS OF WIP here.
 */

import {
  Grid,
  Row,
  Col,
  PageHeader,
  Button,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';

class StockSearch extends Component {
  constructor(props) {
    super(props);
    this.stockEndPoint =
      'https://stockwatch-api.shropnet.net/jsonapi/node/stock';

    this.state = {
      searchedStock: '',
      matchingStocks: [],
      allStockSymbols: [],
      value: '',
      suggestions: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchStocks = this.fetchStocks.bind(this);
    this.getAllStocks = this.getAllStocks.bind(this);
  }

  componentDidMount() {
    let symbol = 'AAPL';
    let token = 'pk_3d12c4e90ede4d44a066ab6573730347';
    const endpoint = `https://cloud.iexapis.com`;
    const stockEndpoint = endpoint + `/beta/stock/${symbol}/quote?token=${token}`;
    const logoEndpoint = endpoint + `/stock/${symbol}/logo?token=${token}`;

    // Getting freebie info from https://api.iextrading.com/1.0/
    // Options: /5y, /2y, /1y, /ytd, /6m, /3m, /1m, /1d.
    const range = '3m';
    const stockInfoEndpoint = 'https://api.iextrading.com/1.0';
    const allSymbols = stockInfoEndpoint + '/ref-data/symbols';
    const stockInfoChartDataEndpoint = stockInfoEndpoint + `/stock/${symbol}/chart/dynamic`;
    const stockInfoChartDataRange = stockInfoChartDataEndpoint + `/${range}`;

    let symbolsData;
    let self = this;
    axios.get(allSymbols)
      .then(function (response) {
        symbolsData = response;
        self.setState({
          allStockSymbols: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(symbolsData, 'Symbols - ' + allSymbols);
  }

  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
      searchedStock: newValue,
    });

    console.log(event.target.value, newValue);
  };

  getAllStocks() {
    fetch(this.stockEndPoint)
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          return result.data;
        } else {
          return [];
        }
      });
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    console.log(suggestion);
    return suggestion.symbol;
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
    console.log('Suggestions callsed');
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });

    console.log('Suggestions Cleared');
  };

  shouldRenderSuggestions = (value) => {
    return value.trim().length > 2;
  }

  // Use your imagination to render suggestions.
  renderSuggestion = suggestion => (
    suggestion.name
  );

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    console.log(event, 'Selection is selected');
  }

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = (query) => {
    let pool = this.state.allStockSymbols;

    const inputValue = query.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : pool.filter(symb =>
      symb.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  }

  fetchStocks(event) {
    event.preventDefault();

    // let searchStock = this.state.searchedStock;
    // let searchParams =
    //   'filter[title][value]=' + searchStock + '&filter[title][operator]==';
    // let stockEndPointSearch = '';
    // if (searchStock) {
    //   stockEndPointSearch = this.stockEndPoint + '?' + searchParams;
    // }

    // fetch(stockEndPointSearch)
    //   .then(res => res.json())
    //   .then(result => {
    //     if (result.data) {
    //       this.setState({
    //         matchingStocks: result.data
    //       });
    //     } else {
    //       this.setState({
    //         matchingStocks: []
    //       });
    //     }
    //   });

    let symbol = this.state.searchedStock;
    let token = 'pk_3d12c4e90ede4d44a066ab6573730347';
    const endpoint = `https://cloud.iexapis.com`;
    const stockEndpoint = endpoint + `/beta/stock/${symbol}/quote?token=${token}`;
    const logoEndpoint = endpoint + `/stock/${symbol}/logo?token=${token}`;

    let self = this;
    axios.get(stockEndpoint)
      .then(function (response) {
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
      onChange: this.handleChange
    };

    let stockDetail = null;
    if (this.state.matchingStocks.length !== 0) {
      stockDetail = (
        <div className="stock-search__results">
          <StockItem stock={this.state.matchingStocks} />
        </div>
      );
    }

    return (
      <React.Fragment>
        <Navigation
          match={this.props.match}
          isLoggedIn={this.props.isLoggedIn}
        />

        <Grid>
          <Row>
            <Col>
              <PageHeader>Stock Search</PageHeader>
            </Col>
          </Row>
          <Row>

            <form className="stock-search__form" onSubmit={this.fetchStocks}>
              {/* <FormGroup>
                <InputGroup>
                  <FormControl
                    type="text"
                    placeholder="Search for stock(s) by symbol. E.g. AAPL,MSFT,VOD.L"
                    value={this.state.searchedStock}
                    onChange={this.handleChange}
                  />
                  <InputGroup.Button>
                    <Button bsStyle="success" onClick={this.fetchStocks}>
                      Search
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </FormGroup> */}
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
            </form>

            {stockDetail}

          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default StockSearch;
