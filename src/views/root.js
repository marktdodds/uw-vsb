import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './root.css';
import HomeContainer from './home/home.container'

class Root extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={HomeContainer}/>
      </Router>
    );
  }
}

export default Root;
