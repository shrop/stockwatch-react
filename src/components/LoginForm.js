import React, { Component } from 'react';
import '../App.css';

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
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
      buttonText = 'Log Out';
    }
    else {
      buttonText = 'Log In';
    }

    return (
      <div>
        <form className="auth-form" onSubmit={this.props.action}>
          <input className="auth-form__cta form-cta" type="submit" value={buttonText} />
        </form>
      </div>
    );
  }
}

export default LoginForm;
