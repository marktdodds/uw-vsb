import React, { Component } from 'react';
import styles from './timetable.module.scss';
import { checks, helpers } from '../../../common';
import { ClassTemplate, TimetableTemplate } from '../../../templates';
import Button from 'react-bootstrap/Button';

class TimetableModule extends Component {
  
  /**
   * Class constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = {
      currentClassCombination: 0,
      pinnedClasses: []
    };
    this.classCombinations = [];
    this.startTime = 1000;
    this.endTime = 1700;
    this.classes = [];
    this.updateClasses = false;
    
  }
  
  /**
   * Lifecycle: When the component mounts
   */
  componentWillMount() {
    this.generateClassCombinations();
  }
  
  /**
   * Generate the different combinations for courses & classes
   */
  generateClassCombinations = () => {
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
      if (!course.enabled) {
        continue;
      }
      const schedule = this.props._terms[this.props.selectedTerm][course.subject][course.catalog_number];
      let pinnedLecture = this.state.pinnedClasses.find(Class => checks.courses.match(course, Class) && checks.classes.isLecture(Class));
      let pinnedTutorial = this.state.pinnedClasses.find(Class => checks.courses.match(course, Class) && !checks.classes.isLecture(Class));
      if (schedule['tutorials'].length === 0) {
        tmp.push(schedule['lectures'].filter(i => !pinnedLecture || checks.classes.match(i, pinnedLecture)).map(i => [i]));
        continue;
      }
      tmp.push(
        schedule['lectures'].flatMap(lecture => schedule['tutorials'].reduce((prev, tutorial) => {
          if (!lecture['classes'].some(lClass => tutorial['classes'].some(iClass => checks.classes.overlap(lClass['date'], iClass['date']) || ((pinnedLecture && !checks.classes.match(lecture, pinnedLecture)) || (pinnedTutorial && !checks.classes.match(tutorial, pinnedTutorial))))))
            prev.push([lecture, tutorial]);
          return prev;
        }, []))
      );
    }
    if (valid && tmp.length > 0) {
      this.classCombinations = tmp.reduce((prev, current) => {
        if (current.length === 0) {
          return prev;
        }
        if (prev.length === 0) {
          return current;
        }
        return prev.flatMap(i => current.reduce((prev, l) => {
          if (!l.some(lClasses => lClasses['classes'].some(lClass => i.some(iClasses => iClasses['classes'].some(iClass => checks.classes.overlap(lClass['date'], iClass['date']))))))
            prev.push(i.concat(l));
          return prev;
        }, []));
      }, []);
    } else if (valid) {
      this.classCombinations = [];
    }
  };
  
  /**
   * Check if a course is pinned
   * @param course The course to check
   */
  courseIsPinned = (course) => {
    return this.state.pinnedClasses.some(obj => checks.classes.match(course, obj));
  };
  
  /**
   * Load the next class combination
   */
  nextClassCombination = () => {
    this.updateClasses = true;
    this.setState(prev => ({
      currentClassCombination: prev.currentClassCombination === this.classCombinations.length - 1 ? 0 : prev.currentClassCombination + 1
    }));
  };
  
  /**
   * Load to previous class combination
   */
  previousClassCombination = () => {
    this.updateClasses = true;
    this.setState(prev => ({
      currentClassCombination: prev.currentClassCombination === 0 ? this.classCombinations.length - 1 : prev.currentClassCombination - 1
    }));
  };
  
  /**
   * Pin a course to a specific time
   * @param Class The class to pin
   */
  togglePinClass = (Class) => {
    this.regenerateClassCombinations = true;
    let pinnedIndex = this.state.pinnedClasses.findIndex(obj => checks.classes.match(Class, obj));
    if (pinnedIndex === -1) {
      this.setState(prev => ({
        pinnedClasses: [...prev.pinnedClasses, { subject: Class['subject'], 'catalog_number': Class['catalog_number'], 'class_number': Class['class_number'], section: Class['section'] }],
        currentClassCombination: 0,
      }));
    } else {
      let pinned = [...this.state.pinnedClasses];
      pinned.splice(pinnedIndex, 1);
      this.setState({
        pinnedClasses: pinned,
        currentClassCombination: 0,
      });
    }
  };
  
  /**
   * Lifecycle: When the component will receive new props
   * @param nextProps
   * @param nextContext
   */
  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps._builder.coursesChanged) {
      this.setState({
        currentClassCombination: 0,
      });
      this.regenerateClassCombinations = true;
    }
  }
  
  /**
   * Render function
   * @returns {*}
   */
  render() {
    if (this.props._builder.coursesChanged || this.regenerateClassCombinations) {
      this.generateClassCombinations();
      this.regenerateClassCombinations = false;
      this.updateClasses = true;
    }
    
    if (this.updateClasses && this.classCombinations.length > 0) {
      this.startTime = 1000;
      this.endTime = 1700;
      this.classCombinations[this.state.currentClassCombination].forEach(Class => {
        Class['classes'].forEach(time => {
          const st = helpers.timeToInteger(time['date']['start_time']);
          const et = helpers.timeToInteger(time['date']['end_time']);
          this.startTime = st && this.startTime > st ? Math.floor(st / 100) * 100 - 100 : this.startTime;
          this.endTime = et && this.endTime < et ? Math.ceil(et / 100) * 100 + 100 : this.endTime;
        });
      });
      
      this.classes = this.classCombinations[this.state.currentClassCombination].map(Class => {
        return <ClassTemplate key={Class['class_number']}
                              class={Class}
                              startTime={this.startTime}
                              endTime={this.endTime}
                              togglePinClass={this.togglePinClass}
                              pinned={this.courseIsPinned(Class)}
                              styles={styles}/>;
      });
      
      this.updateClasses = false;
    } else if (this.updateClasses) {
      this.classes = [];
    }
    
    return (
      <div className={styles.container}>
        
        <div style={{ padding: '20px' }}>
          Class Combination {this.classCombinations.length > 0 ? `${this.state.currentClassCombination + 1}/${this.classCombinations.length}` : '0/0'}
          <br/>
          <Button varient="Primary" onClick={this.previousClassCombination}>Previous</Button>
          <Button varient="Primary" onClick={this.nextClassCombination}>Next</Button>
        </div>
        
        <div className={styles.classList}>
          <div className={styles.header}>Class List</div>
          {this.classCombinations.length > 0 && this.classCombinations[this.state.currentClassCombination].map(Class => {
            return <div key={Class['class_number']}>{Class['subject']}{Class['catalog_number']} - {checks.classes.isLecture(Class) ? 'Lec' : 'Tut'} #{Class['class_number']}</div>;
          })}
        </div>
        
        <div className={styles.timetable}>
          <TimetableTemplate startTime={this.startTime} endTime={this.endTime} styles={styles}/>
          {this.classes}
        </div>
      </div>
    );
  }
}

export default TimetableModule;
