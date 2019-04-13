import React, { Component } from 'react';
import styles from './builder.module.scss';
import FormControl from 'react-bootstrap/FormControl';
import TimetableContainer from './timetable/timetable.container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { checks } from '../../common';

class BuilderModule extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      selectedTerm: '',
      courseQuery: '',
      matchedCourses: [],
    };
    this.filterCourses = this.filterCourses.bind(this);
    this.handleTermSelection = this.handleTermSelection.bind(this);
    this.handleCourseQuery = this.handleCourseQuery.bind(this);
    this.handleAddCourseToBuilder = this.handleAddCourseToBuilder.bind(this);
    this.handleRemoveCourseFromBuilder = this.handleRemoveCourseFromBuilder.bind(this);
    this.handleToggleCourse = this.handleToggleCourse.bind(this);
  }
  
  /**
   * Changes the current term and retrieves the courses for that term if they aren't loaded
   * @param event The browser-generated event
   * @param term The selected term
   */
  handleTermSelection(event, term) {
    this.setState({
      selectedTerm: term.id
    });
    if (!checks.loaded.coursesForTerm(this.props._terms, term.id)) {
      this.props.common.getCoursesForTerm(term.id);
    }
  }
  
  /**
   * Handle input in the course search
   * @param event The browser-generated event
   */
  handleCourseQuery(event) {
    const value = event.target.value;
    this.setState(oldState => ({
      courseQuery: value,
      matchedCourses: this.filterCourses(value, oldState.selectedTerm)
    }));
  }
  
  /**
   * Add a course to the course builder state
   * @param event The browser-generated event
   * @param course The course to add
   */
  handleAddCourseToBuilder(event, course) {
    if (!checks.loaded.courseScheduleForTerm(this.props._terms, course, this.state.selectedTerm)) {
      this.props.common.getCourseScheduleForTerm(this.state.selectedTerm, course.subject, course.catalogNumber);
    }
    if (!checks.loaded.courseInformation(this.props._courses, course)) {
      this.props.common.getCourseInformation(course.subject, course.catalogNumber);
    }
    this.props.builder.addCourse(course);
    this.setState({
      courseQuery: '',
      matchedCourses: []
    });
  }
  
  /**
   * Remove a course from the course builder state
   * @param course The course to remove
   */
  handleRemoveCourseFromBuilder(course) {
    this.props.builder.removeCourse(course);
  }
  
  /**
   * Toggle a course (enable/disable) from the builder
   * @param course The course to toggle
   */
  handleToggleCourse(course) {
    course.enabled ? this.props.builder.disableCourse(course) : this.props.builder.enableCourse(course);
  }
  
  /**
   * Filter available courses based on a query
   * @param query The search query to match by
   * @param selectedTerm The term to search for a course in
   */
  filterCourses(query, selectedTerm) {
    return this.props._terms.availableCourses[selectedTerm].filter(course => course.code.includes(query.replace(/ /g, '').toUpperCase()));
  }
  
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.searchPanel}>
          <div className={styles.termSelect}>
            Select term:
            {this.props._terms.listings.map(term => {
              return term.id >= this.props._terms.current.id ? <span key={term.id} onClick={e => this.handleTermSelection(e, term)}>
                  <input type="radio" onChange={e => this.handleTermSelection(e, term)} checked={this.state.selectedTerm === term.id}/>{term.name}
                </span> : '';
            })}
          </div>
          
          <div className={styles.courseQuery}>
            <FormControl value={this.state.courseQuery} disabled={!this.state.selectedTerm || !this.props._terms.availableCourses[this.state.selectedTerm]}
                         onChange={this.handleCourseQuery} placeholder="Course"/>
            
            {0 < this.state.matchedCourses.length && this.state.matchedCourses.length <= 10 &&
            <div className={styles.courseMatches}>
              {this.state.matchedCourses.map(course => {
                return <div key={course.code} className={styles.course} onClick={e => this.handleAddCourseToBuilder(e, course)}>{course.code} - {course.description}</div>;
              })}
            </div>}
          </div>
          
          <div className={styles.selectedCourses}>
            
            {this.props._builder.courses.map(course => {
              if (checks.loaded.courseInformation(this.props._courses, course)) {
                const courseInfo = this.props._courses[course.subject][course.catalogNumber];
                return <div key={course.subject + course.catalogNumber} className={styles.course}>
                  <p>
                    <span onClick={() => {this.handleToggleCourse(course)}}>
                      <FontAwesomeIcon
                        style={{marginRight: '10px'}}
                        icon={course.enabled ? ['fas', 'check'] : ['far', 'square']}/>
                      </span>
                    {course.subject + course.catalogNumber}: {courseInfo.title}
                  </p>
                  <p>Pre-requisites: {courseInfo.prerequisites}</p>
                  <p>Anti-requisites: {courseInfo.antirequisites}</p>
                  <div onClick={() => this.handleRemoveCourseFromBuilder(course)}
                       className={styles.removeClass}>
                    <FontAwesomeIcon icon='times'/>
                  </div>
                </div>;
              } else {
                return '';
              }
            })}
          
          </div>
        
        
        </div>
        <div className={styles.timetable}>
          {this.state.selectedTerm && <TimetableContainer selectedTerm={this.state.selectedTerm}/>}
        </div>
      </div>
    );
  }
}

export default BuilderModule;
