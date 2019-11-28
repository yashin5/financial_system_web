import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';


const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Home} />
          <Route path="/create_account" component={Home} />
          <Route path="/home" component={Dashboard} />
          <Route path="/withdraw" component={Dashboard} />
          <Route path="/deposit" component={Dashboard} />
          <Route path="/transfer" component={Dashboard} />
          <Route path="/split" component={Dashboard} />
          <Route path="/contacts" component={Dashboard} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;
