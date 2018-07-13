import React, { Component } from 'react';
import './App.css';
import Stock from './components/Stock.js';
import LoginForm from './components/LoginForm';
import Welcome from './components/Welcome';
import StockSearch from './components/StockSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }

    this.loginStateToggle = this.loginStateToggle.bind(this);
  }

  loginStateToggle(event) {
    event.preventDefault()

    const isLoggedIn = this.state.isLoggedIn;
    if (isLoggedIn == true) {
      this.setState({
        isLoggedIn: false
      })
    }
    else {
      this.setState({
        isLoggedIn: true
      })
    }

  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    let login;

    if (isLoggedIn) {
      login = <Welcome />;
    } else {
      login = <LoginForm />
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Stockwatch</h1>
          <form className="login-toggle" onSubmit={this.loginStateToggle}>
            <button className="toggleAuth">Login/Out</button>
          </form>
        </header>
        <div className="App-intro">
          <Stock />
          {login}
          <StockSearch />
        </div>
      </div>
    );
  }
}

export default App;
