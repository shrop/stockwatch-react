import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import StockList from './StockList';

class Dashboard extends React.Component {
  render() {
    const testStocks = [
      {
        id: 123123,
        attributes: {
          title: 'AAPL',
          company_name: 'Apple Inc.',
          stock_price: 23.32
        }
      },
      {
        id: 123121,
        attributes: {
          title: 'AAPL',
          company_name: 'Apple Inc.',
          stock_price: 23.32
        }
      },
      {
        id: 123144,
        attributes: {
          title: 'AAPL',
          company_name: 'Apple Inc.',
          stock_price: 23.32
        }
      },
      {
        id: 1231123,
        attributes: {
          title: 'AAPL',
          company_name: 'Apple Inc.',
          stock_price: 23.32
        }
      },
      {
        id: 1254423,
        attributes: {
          title: 'AAPL',
          company_name: 'Apple Inc.',
          stock_price: 23.32
        }
      },
      {
        id: 126533,
        attributes: {
          title: 'AAPL',
          company_name: 'Apple Inc.',
          stock_price: 23.32
        }
      }
    ];
    return (
      <Grid>
        <Row>
          <Col>
            <PageHeader>Dashboard</PageHeader>
          </Col>
        </Row>
        <Row>
          <StockList stocks={testStocks} />
        </Row>
      </Grid>
    );
  }
}

export default Dashboard;
