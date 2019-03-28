import React, { Component } from 'react';
import './lookup.module.css';

class LookupModule extends Component {
  
  async lookupCourse() {
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.lookupCourse.bind(this)}>Lookup</button>
        <p>Current Term: {this.props.test.terms.current.name}</p>
        <p>Next Term: {this.props.test.terms.next.name}</p>
      </div>
    );
  }
}

export default LookupModule;
