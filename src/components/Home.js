import React, { Component } from 'react';
import '../App.css';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import Logo from './Logo';

class Home extends Component {
  render() {
    return (
      <Grid>
        <Row className="show-grid">
          <Col>
            <p className="text-center">
              <Logo />
            </p>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col xs={12} md={6}>
            <h2>Features</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
              erat ut massa finibus fringilla eu et odio. Phasellus in erat at
              lorem fermentum commodo vitae nec augue. Aliquam non ultrices
              mauris, ac dictum lectus. Ut vestibulum dui sit amet leo semper,
              in interdum est blandit.
            </p>
            <p>
              Cras congue mi vel augue congue, ac pretium ligula vestibulum.
            </p>
            <p>
              Donec odio lacus, aliquet ac massa in, sollicitudin sollicitudin
              arcu. In consectetur hendrerit aliquam.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <img
              className="img-rounded img-responsive"
              src="https://placehold.it/600x400"
              alt=""
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
