import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Logo from './components/Logo';
import Welcome from './components/Welcome';
import StockSearch from './components/StockSearch';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }

    this.authStateToggle = this.authStateToggle.bind(this);
  }

  authStateToggle(event) {
    event.preventDefault();

    if (this.state.isLoggedIn === true) {
      this.setState({
        isLoggedIn: false
      });
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
    let search;

    if (isLoggedIn) {
      login = <Welcome />;
      search = <StockSearch />;
    } else {
      login = <LoginForm />;
    }

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-header__wrapper container">
            <Logo style="mark" />

            <div className="App-header__title">Stockwatch</div>

            <div className="App-header__login login-toggle">
              <LoginForm action={this.authStateToggle} isLoggedIn={this.state.isLoggedIn} />
            </div>
          </div>
        </header>

        <div className="App-intro container">
          {login}
          {search}
        </div>
      </div>
    );
  }
}

export default App;
