import React, { Component } from 'react';
import styles from './lookup.module.css';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { helpers, checks } from '../../common';

class LookupModule extends Component {
  
  /*
  * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      courseQuery: '',
      selectedTerm: '',
      matchedCourses: [],
      courseToView: {
        subject: '',
        catalog_number: ''
      }
    };
    
    // Form handlers
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCourseSearchInput = this.handleCourseSearchInput.bind(this);
    this.handleTermSelectionInput = this.handleTermSelectionInput.bind(this);
    
    // Getters/Settings
    this.filterCourses = this.filterCourses.bind(this);
    this.getCourseLookup = this.getCourseLookup.bind(this);
    
    // View helpers
    this.courseScheduleForTerm = this.courseScheduleForTerm.bind(this);
    
    // Logic checks
    this.isCourseInformationLoaded = this.isCourseInformationLoaded.bind(this);
    this.isCourseScheduleForTermLoaded = this.isCourseScheduleForTermLoaded.bind(this);
  }
  
  /*
  * Handle a course code input
   */
  handleCourseSearchInput(event) {
    const query = event.target.value;
    this.setState({courseQuery: query});
    this.filterCourses(query.replace(/ /g, '').toUpperCase());
  }
  
  /*
  * Handle term selection input
   */
  handleTermSelectionInput(selectedTerm) {
    this.setState({selectedTerm: selectedTerm});
    if (!this.props.terms.availableCourses[selectedTerm]) {
      this.props.common.getCoursesForTerm(selectedTerm);
    }
  }
  
  /*
  * Handle search form submit
   */
  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.form);
  }
  
  /*
  * Search for a course using the courseQuery
   */
  filterCourses(query) {
    this.setState(oldState => ({
      matchedCourses: this.props.terms.availableCourses[oldState.selectedTerm].filter(course => course.code.includes(query))
    }));
  }
  
  /*
  * Get the information for a specific course
  * Get the schedule for a specific course in a specific term
   */
  getCourseLookup(course) {
    this.props.common.getCourseInformation(course.subject, course.catalog_number);
    this.props.common.getCourseScheduleForTerm(this.state.selectedTerm, course.subject, course.catalog_number);
    this.setState({
      courseToView: {
        subject: course.subject,
        catalog_number: course.catalog_number,
        view: true
      }
    });
  }
  
  /*
  * Get the course schedule for a course and term from props
   */
  
  courseScheduleForTerm(selectedTerm, course) {
    return this.props.terms[selectedTerm][course.subject][course.catalog_number];
  }
  
  /*
  * Check if course information is loaded into memory
   */
  isCourseInformationLoaded(course) {
    return checks.loaded.courseInformation(this.props.courses, course);
  }
  
  /*
  * Check if course schedule for a specific term is loaded
   */
  isCourseScheduleForTermLoaded(selectedTerm, course) {
    return checks.loaded.courseScheduleForTerm(this.props.terms, course, selectedTerm);
  }
  
  /*
  * Render the UI
   */
  render() {
    return (
      <div className="App">
        {JSON.stringify(this.state.form)}
        <p>Current Term: {this.props.terms.current.name}</p>
        <p>Next Term: {this.props.terms.next.name}</p>
        <p>{this.state.matchedCourses.length}</p>
        
        <Form onSubmit={this.handleFormSubmit}>
          <Row className={styles.noMargin}>
            <Dropdown onSelect={this.handleTermSelectionInput}>
              
              <Dropdown.Toggle variant="success" id="term-dropdown">
                {(this.props.terms.listings.find(term => {
                  return term.id.toString() === this.state.selectedTerm.toString();
                }) || {name: 'Select a term'}).name}
              </Dropdown.Toggle>
              
              <Dropdown.Menu>
                {this.props.terms.listings.map(term => {
                  return term.id >= this.props.terms.current.id ?
                    <Dropdown.Item key={term.id} eventKey={term.id}>
                      {term.name}
                    </Dropdown.Item> : '';
                  
                })}
              </Dropdown.Menu>
            
            </Dropdown>
            
            <Col>
              <Form.Control value={this.state.courseQuery} disabled={!this.state.selectedTerm || !this.props.terms.availableCourses[this.state.selectedTerm]}
                            onChange={this.handleCourseSearchInput} placeholder="Course"/>
            </Col>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          
          </Row>
        </Form>
        
        {this.state.matchedCourses.length < 20 &&
        <div>
          {this.state.matchedCourses.map(course => {
            return <p key={course.code} onClick={e => {
              this.getCourseLookup(course);
            }}>{course.code} - {course.description}</p>;
          })}
        </div>
        }
        {this.state.courseToView.view && this.isCourseScheduleForTermLoaded(this.state.selectedTerm, this.state.courseToView) &&
        <Table>
          <thead>
          <tr>
            <th>Section</th>
            <th>Class</th>
            <th>Campus</th>
            <th>Enrolled</th>
            <th>Time</th>
            <th>Days</th>
            <th>Location</th>
            <th>Instructors</th>
          </tr>
          </thead>
          <tbody>
          {this.courseScheduleForTerm(this.state.selectedTerm, this.state.courseToView)['lectures'].map(lecture => {
            return <tr key={helpers.uniqueId()}>
              <td>{lecture['section']}</td>
              <td>{lecture['class_number']}</td>
              <td>{lecture['campus']}</td>
              <td>{lecture['enrollment_total']}/{lecture['enrollment_capacity']}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['date']['start_time']} - {Class['date']['end_time']}
                </div>;
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['date']['weekdays']}
                </div>;
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['location']['building']} {Class['location']['room']}
                </div>;
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['instructors'].join(', ')}
                </div>;
              })}</td>
            </tr>;
          })}
          {this.courseScheduleForTerm(this.state.selectedTerm, this.state.courseToView)['tutorials'].map(lecture => {
            return <tr key={helpers.uniqueId()}>
              <td>{lecture['section']}</td>
              <td>{lecture['class_number']}</td>
              <td>{lecture['campus']}</td>
              <td>{lecture['enrollment_total']}/{lecture['enrollment_capacity']}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['date']['start_time']} - {Class['date']['end_time']}
                </div>;
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['date']['weekdays']}
                </div>;
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['location']['building']} {Class['location']['room']}
                </div>;
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                  {Class['instructors'].join(', ')}
                </div>;
              })}</td>
            </tr>;
          })}
          </tbody>
        </Table>}
      
      </div>
    );
  }
}

export default LookupModule;
