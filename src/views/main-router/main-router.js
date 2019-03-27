import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './main-router.css';
import HomeContainer from '../home/home.container'
import RedirectComponent from './redirect'

class MainRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={HomeContainer}/>
          <Route component={RedirectComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default MainRouter;
