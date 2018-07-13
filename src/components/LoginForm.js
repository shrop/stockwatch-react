import React, { Component } from 'react';
import '../App.css';
import Logo from './Logo';
class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    alert('Do something fancy like log in and get session token');
    event.preventDefault();
  }

  render() {
    let buttonText;
    let loginState;

    if (this.props.isLoggedIn === true) {
      buttonText = 'Log Out';
      loginState = this.props.action;
    }
    else {
      buttonText = 'Log In';
      loginState = this.props.action;
    }

    return (
      <div>
        <form className="auth-form" onSubmit={loginState}>
          <input className="auth-form__cta form-cta" type="submit" value={buttonText} />
        </form>
      </div>
    );
  }
}

export default LoginForm;
