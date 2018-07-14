import React, { Component } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import Logo from './components/Logo';
import Welcome from './components/Welcome';
import StockSearch from './components/StockSearch';
import ClientOAuth2 from 'client-oauth2';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }

    this.authStateToggle = this.authStateToggle.bind(this);
    this.authLogin = this.authLogin.bind(this);
  }

  componentDidMount() {
    this.authLogin();
  }

  authLogin() {
    // Check for an Oauth access token and save to session storage.
    let url = window.location.href;
    let accessToken = url.match(/access_token/);

    if (accessToken) {
      function getParameterByName(name) {
        let match = RegExp('[#&]' + name + '=([^&]*)').exec(url);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
      }
      let oauthAccessToken = getParameterByName('access_token');
      sessionStorage.setItem('oauthAccessToken', oauthAccessToken);
      this.setState({
        isLoggedIn: true
      });
    }
  }

  authStateToggle(event) {
    event.preventDefault();
    let sessionStatus = sessionStorage.getItem('oauthAccessToken');
    if (sessionStatus) {
      sessionStorage.removeItem('oauthAccessToken');
      this.setState({
        isLoggedIn: false
      });
    }
    else {
      // Authenticate with Oauth2.
      const contentaOauth = new ClientOAuth2({
        clientId: '96d57f1d-19a1-4ba4-9db0-055bb2e4c523',
        authorizationUri: 'https://stockwatch-api.shropnet.net/oauth/authorize',
        redirectUri: 'http://localhost:3000'
      })

      let url = window.location.href;
      let accessToken = url.match(/access_token/);

      if (!accessToken) {
        window.open(contentaOauth.token.getUri(), '_self');
      }
      this.setState({
        isLoggedIn: true
      });
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
      login = <div>Welcome!</div>;
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
