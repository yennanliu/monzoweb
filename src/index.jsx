import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Authenticated from './Authenticated';
import Login from './Login';
import Callback from './Callback';

const unAuthenticatedRedirectToLogin = () => (localStorage.monzo_access_token ? <Authenticated /> : <Redirect to="/login" />);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/callback" component={Callback} />
      <Route path="/" render={unAuthenticatedRedirectToLogin} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('monzoweb'),
);
