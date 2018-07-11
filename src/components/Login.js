import React, { Component } from 'react';
import '../App.css';
import JsonApi from 'devour-client'

class Login extends Component {

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
    return (
      <form class="login-form" onSubmit={this.handleSubmit}>
        <input class="login-form__input" name="email" type="text" placeholder="Email Address" value={this.state.email} onChange={this.handleChange} />
        <input class="login-form__input" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
        <input class="login-form__cta" type="submit" value="Submit" />
      </form>
    );
  }
}

export default Login;
