import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PrivateRoute from '../src/PrivateRoute'
import createBrowserHistory from '../src/history'


const App: React.FC = () => {
  return (
      <Router history={createBrowserHistory}>
        <Switch>
          <Route path="/login" component={Home} />
          <Route path="/create_account" component={Home} />
          <PrivateRoute path="/home" component={Dashboard} />
          <PrivateRoute path="/withdraw" component={Dashboard} />
          <PrivateRoute path="/deposit" component={Dashboard} />
          <PrivateRoute path="/transfer" component={Dashboard} />
          <PrivateRoute path="/split" component={Dashboard} />
          <PrivateRoute path="/contacts" component={Dashboard} />
        </Switch>
      </Router>
  );
};

export default App;
