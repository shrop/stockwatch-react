import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from './Navigation';
import StockSearch from './StockSearch';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard.js';
import Home from './Home';

class StockWatchRouter extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
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
