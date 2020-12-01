import React from 'react';
import './App.css';
import { Helmet } from 'react-helmet';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import LoginPage from './core/feature/authFlow/contatiners/loginPage';
import history from './history';

function App() {
  return (
    <div>
      <Helmet>
        <title>Simple auth</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Helmet>
      <CssBaseline />
      <Router history={history}>
        <Switch>
          <Route path="/login" exact component={LoginPage} />
           {/*<Route path="/registration" exact component={RegisterPage} /> */}
           <Route path="/registration" exact component={} />
          {/* <PrivateRoute path="/" component={MainPage} /> */}
          <Redirect to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
