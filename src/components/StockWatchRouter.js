import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import StockSearch from './StockSearch';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import Home from './Home';

class StockWatchRouter extends React.Component {
  constructor(props) {
    super();
  }

  userAuth() {
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
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/stock-search" component={StockSearch} />
            <Route path="/sign-in" component={LoginForm} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default StockWatchRouter;
