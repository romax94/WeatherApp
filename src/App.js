import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GameField from './pages/GameField';
import Settings from './pages/Settings';

export const App = () => (
  <Router>
    <div className="app">
      <Route exact path="/" component={GameField} />
      <Route path="/settings" component={Settings} />
    </div>
  </Router>
);
