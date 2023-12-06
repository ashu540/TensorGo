const React = require('react');
const { BrowserRouter: Router, Route, Switch } = require('react-router-dom');
const GoogleLoginComponent = require('./components/GoogleLoginComponent');
const Dashboard = require('./components/Dashboard');

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={GoogleLoginComponent} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </Router>
);

module.exports = App;
