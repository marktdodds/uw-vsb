import React, { Component } from 'react';
import { Redirect } from 'react-router';

class RedirectComponent extends Component {
  
  render() {
    return (
      <Redirect to='/builder'/>
    );
  }
}

export default RedirectComponent;
