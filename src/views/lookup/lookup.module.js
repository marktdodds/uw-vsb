import React, { Component } from 'react';
import styles from './lookup.module.css';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import helpers from '../../common/helpers.common'

class LookupModule extends Component {
  
  /*
  * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      courseQuery: '',
      termId: '',
      matchedCourses: [],
      courseToView: {
        subject: '',
        catalogNumber: ''
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
  handleTermSelectionInput(termId) {
    this.setState({termId: termId});
    if (!this.props.terms.availableCourses[termId]) {
      this.props.common.getCoursesForTerm(termId);
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
      matchedCourses: this.props.terms.availableCourses[oldState.termId].filter(course => course.code.includes(query))
    }))
  }
  
  /*
  * Get the information for a specific course
  * Get the schedule for a specific course in a specific term
   */
  getCourseLookup(course) {
    this.props.common.getCourseInformation(course.subject, course.catalogNumber);
    this.props.common.getCourseScheduleForTerm(this.state.termId, course.subject, course.catalogNumber);
    this.setState({
      courseToView: {
        subject: course.subject,
        catalogNumber: course.catalogNumber,
        view: true
      }
    })
  }
  
  /*
  * Get the course schedule for a course and term from props
   */
  
  courseScheduleForTerm(termId, course) {
    return this.props.terms[termId][course.subject][course.catalogNumber]
  }
  
  /*
  * Check if course information is loaded into memort
   */
  isCourseInformationLoaded(course) {
    return this.props.courses.hasOwnProperty(course.subject) &&
      this.props.courses[course.subject].hasOwnProperty(course.catalogNumber);
  }
  
  /*
  * Check if course schedule for a specific term is loaded
   */
  isCourseScheduleForTermLoaded(termId, course) {
    return this.props.terms.hasOwnProperty(termId) &&
      this.props.terms[termId].hasOwnProperty(course.subject) &&
      this.props.terms[termId][course.subject].hasOwnProperty(course.catalogNumber);
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
                  return term.id.toString() === this.state.termId.toString()
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
              <Form.Control value={this.state.courseQuery} disabled={!this.state.termId || !this.props.terms.availableCourses[this.state.termId]}
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
              this.getCourseLookup(course)
            }}>{course.code} - {course.description}</p>
          })}
        </div>
        }
        {this.state.courseToView.view && this.isCourseScheduleForTermLoaded(this.state.termId, this.state.courseToView) &&
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
          {this.courseScheduleForTerm(this.state.termId, this.state.courseToView)['lectures'].map(lecture => {
            return <tr key={helpers.uniqueId()}>
              <td>{lecture['section']}</td>
              <td>{lecture['class_number']}</td>
              <td>{lecture['campus']}</td>
              <td>{lecture['enrollment_total']}/{lecture['enrollment_capacity']}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                    {Class['date']['start_time']} - {Class['date']['end_time']}
                </div>
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                    {Class['date']['weekdays']}
                </div>
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                    {Class['location']['building']} {Class['location']['room']}
                </div>
              })}</td>
              <td>{lecture['classes'].map(Class => {
                return <div key={helpers.uniqueId()}>
                    {Class['instructors'].join(', ')}
                </div>
              })}</td>
            </tr>
          })}
          </tbody>
        </Table>}
      
      </div>
    );
  }
}

export default LookupModule;
