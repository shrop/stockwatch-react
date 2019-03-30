/**
 * @file
 * Entrypoint to the Stockwatch React App.
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter,
  Redirect,
} from 'react-router-dom'
import StockSearch from '../StockSearch/StockSearch';
import LoginForm from '../LoginForm/LoginForm';
import Dashboard from '../Dashboard/Dashboard';
import Home from '../HomePage/HomePage';
import './StockWatchRouter.scss';
import {appAuth} from '../AppAuth/AppAuth.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// See: https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    appAuth.isAuthenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: "/log-in",
          state: { from: props.location }
        }} />
  )} />
);

const AuthButton = withRouter(({ history }) => (

  appAuth.isAuthenticated ? (
    <li className="dropdown">
      <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">Log out</a>
      <ul className="dropdown-menu">
        <li>
          <a
            href="#"
            onClick={() => {
              appAuth.signout(() => history.push('/'))
            }}
          >
            Sign Out
          </a>
        </li>
      </ul>
      </li>
  ) : (
    ''
  )
));

class StockWatchRouter extends React.Component {
  constructor(props) {
    super();

    this.state = {
      navigationLinks: [
        {
          path: '/',
          text: 'Home'
        },
        {
          path: '/dashboard',
          text: 'Dashboard'
        },
        {
          path: '/stock-search',
          text: 'Search'
        },
      ],
    }

    // Verify apps status as soon as application loads
    appAuth.authStatus();

    this.userAuth = this.userAuth.bind(this);
    this.notification = this.notification.bind(this);
  }

  notification(text, status) {
    if (status === 'success') {
      toast.success(text, {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (status === 'error') {
      toast.error(text, {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      toast.info(text, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }

  userAuth(callback) {
    // Pass the callback to the auth function.
    appAuth.authenticate(callback)
  }

  render() {
    return (
      <>
        <ToastContainer />
        <Router>
          <div className="app-navigation">
            <nav className="navbar navbar-default navbar-lg navbar-expand-lg" role="navigation">
              <a className="navbar-brand" href="/">Stockwatch</a>

              <div className="justify-content-between">
                <ul className="nav navbar-nav navbar-right">
                  {this.state.navigationLinks.map((link, key) => {
                    return <li
                    className="navigation__link"
                    key={key}>
                      <Link to={link.path}>{link.text}</Link>
                    </li>;
                  })}
                  {/* Render Logout button */}
                  <AuthButton />
                </ul>

              </div>
            </nav>

            <Route
              exact path="/"
              render={(props) => <Home {...props} isLoggedIn={this.isLoggedIn} />}
            />
            <PrivateRoute
              path='/dashboard'
              component={(props) => <Dashboard {...props} notification={this.notification} />} />
            <PrivateRoute
              path='/stock-search'
              component={(props) => <StockSearch {...props} notification={this.notification} />} />
            <Route
              path="/log-in"
              render={(props) => <LoginForm {...props} auth={this.userAuth} />}
            />
          </div>
        </Router>
      </>
    );
  }
}

export default StockWatchRouter;
