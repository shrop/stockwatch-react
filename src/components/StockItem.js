import React, { Component } from 'react';
import { css } from 'emotion';
import { Grid, Row, Col } from 'react-bootstrap';

const stockItem = css`
  padding-top: 1.5rem;
  padding-bottom: 1.75rem;
  border-bottom: 1px solid #d1d1d1;
`;
const stockSymbol = css`
  color: #444444;
  font-size: 3rem;
  font-weight: 300;
  line-height: 1.46428571;
`;
const stockName = css`
  color: #999999;
  font-size: 1.5rem;
  font-weight: 300;
`;
const stockItemChange = css`
  display: inline-block;
  float: right;
  font-size: 1.5rem;

  &.positive {
    color: #34ca6e;
  }

  &.negative {
    color: #f46168;
  }
`;
const stockItemChange__positive = stockItemChange + ' positive';
const stockItemChange__negative = stockItemChange + ' negative';

class StockItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row className={stockItem}>
        <Col xs={9}>
          <div className={stockSymbol}>{this.props.stock.attributes.title}</div>
          <div className={stockName}>
            {this.props.stock.attributes.company_name}
          </div>
        </Col>
        <Col xs={3}>
          <div className="pull-right">
            <div className={stockSymbol}>
              {this.props.stock.attributes.stock_price}
            </div>
            <div className={stockItemChange__positive}>+2.91</div>
          </div>
        </Col>
      </Row>
    );
  }
}

export default StockItem;
