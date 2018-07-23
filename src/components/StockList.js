import React, { Component } from 'react';
import StockItem from './StockItem';

class StockList extends Component {
  render() {
    return (
      <div>
        {this.props.stocks.map((stock) => {
          return (
            <StockItem key={stock.id} stock={stock} />
          )
        })}
      </div>
    );
  }
}

export default StockList;
