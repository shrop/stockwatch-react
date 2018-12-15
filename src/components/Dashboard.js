import React from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import StockList from './StockList';
import Navigation from './Navigation';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      stocks: []
    };
  }

  componentDidMount() {
    this.getStocks();
  }

  getStocks() {
    const stockEndPoint =
      'https://stockwatch-api.shropnet.net/jsonapi/node/stock';

    fetch(stockEndPoint)
      .then(res => res.json())
      .then(result => {
        if (result.data) {
          this.setState({
            stocks: result.data
          });
        } else {
          this.setState({
            stocks: []
          });
        }
      });
  }
  render() {
    return (
      <React.Fragment>
        <Navigation match={this.props.match} />
        <Grid>
          <Row>
            <Col>
              <PageHeader>Dashboard</PageHeader>
            </Col>
          </Row>
          <Row>
            <StockList stocks={this.state.stocks} />
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Dashboard;
