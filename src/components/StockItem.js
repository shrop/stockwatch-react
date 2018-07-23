import React, { Component } from 'react';
import { css } from 'emotion'

const stockItem = css`
  display: flex;
  align-items: flex-start;
  padding-top: .75rem;
  padding-bottom: .75rem;
  border-bottom: 1px solid #d1d1d1;
`
const stockItemColumn1 = css`
  flex-basis: 70%;
`
const stockItemColumn2 = css`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`
const stockPrice = css`
  font-size: 1.5rem;
  text-align: right;
`
const stockSymbol = css`
  color: #444444;
  font-size: 1.5rem;
`
const stockName = css`
  color: #999999;
  font-size: 0.8rem;
  opacity: 0.7;
`
const stockItemChange = css`
  padding: 3px;
  border-radius: 3px;
  display: inline-block;
  color: #ffffff;
  float: right;
  font-size: 0.8rem;

  &.positive {
    background: #34CA6E;
  }

  &.negative {
    background: #F46168;
  }
`
const stockItemChange__positive = stockItemChange + " positive";
const stockItemChange__negative = stockItemChange + " negative";

class StockItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props, this.props.stock.id + ' -- Unique Key');
    return (
      <div className={stockItem}>
        <div className={stockItemColumn1}>
          <div className={stockSymbol}>{this.props.stock.attributes.title}</div>
          <div className={stockName}>{this.props.stock.attributes.company_name}</div>
        </div>

        <div className={stockItemColumn2}>
          <div className={stockPrice}>{this.props.stock.attributes.stock_price}</div>
          <div>
            <span className={stockItemChange__positive}>+2.91</span>
          </div>
        </div>
      </div>
    );
  }
}

export default StockItem;
