import React, { Component } from 'react';
import '../App.css';
import JsonApi from 'devour-client'

class Stock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stocks: []
    };
  }

  componentWillMount() {
    this.getStocks();
  }

  getStocks() {
    const jsonApi = new JsonApi({apiUrl:'https://stockwatch-api.shropnet.net/jsonapi', pluralize: false});

    jsonApi.define('node--stock', {
      title: '',
      symbol: ''
    },
    {
      collectionPath: 'node/stock'
    });

    let { response, errors, meta, links } = jsonApi.find('node--stock', 'f6acda8e-2904-4bf5-820c-1a7fa3fe079c')
      .then((response) => {
        console.log(response);
        this.setState({
          stocks: response.data.symbol
        });
    });
  }

  render() {
    return (
      <div className="Stock">
        {this.state.stocks}
      </div>
    );
  }
}

export default Stock;
