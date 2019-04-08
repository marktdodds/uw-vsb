import React, { Component } from 'react';
import styles from './timetable.module.scss';
import { checks, helpers } from '../../../common';
import { ClassTemplate, TimetableTemplate } from '../../../templates';
import Button from "react-bootstrap/Button";

class TimetableModule extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentClassCombination: 0
    };
    this.classCombinations = [];
    this.startTime = 1000;
    this.endTime = 1700;
    this.classes = [];
    this.updateClasses = false;
    
    this.generateClassCombinations = this.generateClassCombinations.bind(this);
    this.nextClassCombination = this.nextClassCombination.bind(this);
    this.previousClassCombination = this.previousClassCombination.bind(this);
  }
  
  componentWillMount() {
    this.generateClassCombinations()
  }
  
  generateClassCombinations() {
    console.warn('Regenerating class combinations');
    let tmp = [];
    let count = this.props._builder.courses.length;
    let valid = true;
    for (let i = 0; i < count; i++) {
      let course = this.props._builder.courses[i];
      if (!checks.loaded.courseScheduleForTerm(this.props._terms, course, this.props.selectedTerm)) {
        valid = false;
        break;
      }
      const schedule = this.props._terms[this.props.selectedTerm][course.subject][course.catalogNumber];
      if (schedule['tutorials'].length === 0) {
        tmp.push([schedule['lectures']]);
        continue;
      }
      tmp.push(
        schedule['lectures'].flatMap(lecture => schedule['tutorials'].map(tutorial => [lecture, tutorial]))
      );
    }
    if (valid && tmp.length > 0) {
      this.classCombinations = tmp.slice(1).reduce((prev, current) => {
        if (current.length === 0) {
          return prev;
        }
        if (prev.length === 0) {
          return current;
        }
        return prev.flatMap(i => current.map(l => i.concat(l)))
      }, tmp[0]);
    }
  }
  
  nextClassCombination() {
    this.updateClasses = true;
    this.setState(prev => ({
      currentClassCombination: prev.currentClassCombination === this.classCombinations.length - 1 ? 0 : prev.currentClassCombination + 1
    }));
  }
  
  previousClassCombination() {
    this.updateClasses = true;
    this.setState(prev => ({
      currentClassCombination: prev.currentClassCombination === 0 ? this.classCombinations.length - 1 : prev.currentClassCombination - 1
    }));
  }
  
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps._builder.coursesChanged) {
      this.setState({
        currentClassCombination: 0
      });
    }
  }
  
  render() {
    
    if (this.props._builder.coursesChanged) {
      this.generateClassCombinations();
      this.updateClasses = true;
    }
    
    if (this.updateClasses && this.classCombinations.length > 0) {
      
      this.classCombinations[this.state.currentClassCombination].forEach(Class => {
        Class['classes'].forEach(time => {
          const st = helpers.timeToInteger(time['date']['start_time']);
          const et = helpers.timeToInteger(time['date']['end_time']);
          this.startTime = this.startTime > st ? Math.floor(st / 100) * 100 - 100 : this.startTime;
          this.endTime = this.endTime < et ? Math.ceil(et / 100) * 100 + 100 : this.endTime;
        })
      });
      
      this.classes = this.classCombinations[this.state.currentClassCombination].map(Class => {
        return <ClassTemplate key={Class['class_number']}
                              class={Class}
                              startTime={this.startTime}
                              endTime={this.endTime}
                              styles={styles}/>
      });
      
      this.updateClasses = false;
    }
    
    
    return (
      <div className={styles.container}>
        
        {this.classCombinations.length > 0 &&
        <div>
          Class Combination {this.state.currentClassCombination + 1}/{this.classCombinations.length}
          <br/>
          <Button varient="Primary" onClick={this.nextClassCombination}>Next</Button>
          <Button varient="Primary" onClick={this.previousClassCombination}>Previous</Button>
        </div>}
        
        <div className={styles.timetable}>
          <TimetableTemplate startTime={this.startTime} endTime={this.endTime} styles={styles}/>
          {this.classes}
        </div>
        {JSON.stringify(this.classCombinations)}
      </div>
    );
  }
}

export default TimetableModule;
