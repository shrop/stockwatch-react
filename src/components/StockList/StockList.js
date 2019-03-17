import React, { Component } from 'react';
import StockItem from '../StockItem/StockItem';
import PropTypes from 'prop-types';

class StockList extends Component {
  render() {
    return (
      <div>
        {this.props.stocks.map((stock, index) => {
          return <StockItem key={index} stock={stock} />;
        })}
      </div>
    );
  }
}

StockList.propTypes = {
  stocks: PropTypes.array.isRequired
}

export default StockList;
