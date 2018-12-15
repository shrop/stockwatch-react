import React, { Component } from 'react';
import '../App.css';
import StockList from './StockList';
import Navigation from './Navigation';
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
      matchingStocks: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.fetchStocks = this.fetchStocks.bind(this);
    this.getAllStocks = this.getAllStocks.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchedStock: event.target.value
    });
  }
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
  fetchStocks(event) {
    event.preventDefault();

    let searchStock = this.state.searchedStock;
    let searchParams =
      'filter[title][value]=' + searchStock + '&filter[title][operator]==';
    let stockEndPointSearch = '';
    if (searchStock) {
      stockEndPointSearch = this.stockEndPoint + '?' + searchParams;
    }

    fetch(stockEndPointSearch)
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          this.setState({
            matchingStocks: result.data
          });
        } else {
          this.setState({
            matchingStocks: []
          });
        }
      });
  }

  render() {
    console.log(this.state.matchingStocks);
    return (
      <React.Fragment>
        <Navigation match={this.props.match} />
        <Grid>
          <Row>
            <Col>
              <PageHeader>Stock Search</PageHeader>
            </Col>
          </Row>
          <Row>
            <form className="stock-search__form" onSubmit={this.fetchStocks}>
              <FormGroup>
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
              </FormGroup>
            </form>

            <div className="stock-search__results">
              <StockList stocks={this.state.matchingStocks} />
            </div>
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default StockSearch;
