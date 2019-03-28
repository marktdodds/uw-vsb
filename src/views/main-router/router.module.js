import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './router.module.css';
import BuilderContainer from '../builder/builder.container'
import LookupContainer from '../lookup/lookup.container'
import RedirectComponent from './redirect.module'
import HeaderContainer from "../header/header.container";

class RouterModule extends Component {
  
  componentWillMount() {
    this.props.getTerms();
  }
  
  render() {
    return (
      <Router>
        <HeaderContainer/>
        
        <Switch>
          <Route path="/builder" exact component={BuilderContainer}/>
          <Route path="/lookup" exact component={LookupContainer}/>
          <Route component={RedirectComponent}/>
        </Switch>
      </Router>
    );
  }
}

export default RouterModule;
