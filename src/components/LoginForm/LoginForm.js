import React, { Component } from 'react';
import Logo from '../Logo/Logo';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.login = this.login.bind(this);
  }

  login = (event) => {
    event.preventDefault();
    this.props.auth(() => {
      this.setState(() => ({
        redirectToReferrer: true
      }))
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    // Redirect user if they got to log in page while trying to get to another
    // page.
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className="container">
        <div className="text-center">
          <Logo />
        </div>
        <hr />
        <h2>Log In</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla id
          erat ut massa finibus fringilla eu et odio. Phasellus in erat at
          lorem fermentum commodo vitae nec augue.
        </p>

        <div className="text-center">
          <input
            className="btn btn-primary btn-hg"
            type="submit"
            onClick={this.login}
            value="Sign In"
          />
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  location: PropTypes.object,
  auth: PropTypes.func
}

export default LoginForm;
