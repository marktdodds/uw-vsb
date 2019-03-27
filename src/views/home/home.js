import React, { Component } from 'react';
import './home.css';

class Home extends Component {
  
  async lookupCourse() {
    this.props.loadCourseSchedule(5786);
  }
  
  render() {
    return (
      <div className="App">
        <button onClick={this.lookupCourse.bind(this)}>Lookup</button>
      </div>
    );
  }
}

export default Home;
