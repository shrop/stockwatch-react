import React, { Component } from 'react';
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import Logo from './Logo';
import '../App.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonText: 'Log In'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    let buttonText;

    if (this.props.isLoggedIn === true) {
      this.setState.buttonText = 'Log Out';
    } else {
      this.setState.buttonText = 'Log In';
    }

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
          <Col xs={12}>
            <h2>Log In</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
              erat ut massa finibus fringilla eu et odio. Phasellus in erat at
              lorem fermentum commodo vitae nec augue.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <form className="auth-form" onSubmit={this.props.action}>
              <p className="text-center">
                <input
                  className="btn btn-primary btn-hg"
                  type="submit"
                  value={this.state.buttonText}
                />
              </p>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LoginForm;
