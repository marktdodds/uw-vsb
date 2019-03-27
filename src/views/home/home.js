import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <button onClick={this.props.lookupCourse}>Lookup</button>
      </div>
    );
  }
}

export default Home;
