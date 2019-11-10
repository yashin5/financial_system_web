import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/withdraw" component={Dashboard} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
