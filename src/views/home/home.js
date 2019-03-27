import React, { Component } from 'react';
import './home.css';
import endpoints from '../../config/endpoints.config'

class Home extends Component {
  
  async lookupCourse() {
    const response = await fetch(endpoints.uWaterlooApi.construct(endpoints
        .uWaterlooApi
        .courses()
        .subject('CS')
        .catalogNumber('245')
        .schedule()),
      {
        method: 'GET'
      });
    console.log(await response.json());
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
