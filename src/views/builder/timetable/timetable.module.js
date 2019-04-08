import React, { Component } from 'react';
import styles from './timetable.module.scss';
import { checks } from '../../../common';
import { TimetableTemplate } from '../../../templates';

class TimetableModule extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    const startTime = 800;
    const endTime = 2000;
    
    return (
      <div className={styles.container}>
        
        <div>
          Header
        </div>
        
        <div className={styles.timetable}>
          <TimetableTemplate startTime={startTime} endTime={endTime} styles={styles}/>
          
          <div style={{position: 'absolute', background: 'black', top: 0, left: 0, width: '18%', height: '3vh'}}/>
        </div>
        {this.props._builder.courses.map(course => {
          if (checks.loaded.courseScheduleForTerm(this.props._terms, course, this.props.selectedTerm)) {
            const schedule = this.props._terms[this.props.selectedTerm][course.subject][course.catalogNumber];
            return <div key={this.props.selectedTerm + course.code + course.catalogNumber}>
              {JSON.stringify(schedule)}
            </div>;
          } else {
            return '';
          }
        })}
      </div>
    );
  }
}

export default TimetableModule;
