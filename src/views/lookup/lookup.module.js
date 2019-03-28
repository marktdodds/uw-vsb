import React, { Component } from 'react';
import styles from './lookup.module.css';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LookupModule extends Component {
  
  /*
  * Constructor
   */
  constructor(props) {
    super(props);
    this.state = {
      form: {
        courseQuery: '',
        termId: ''
      },
      matchedCourses: []
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCourseSearchInput = this.handleCourseSearchInput.bind(this);
    this.handleTermSelectionInput = this.handleTermSelectionInput.bind(this);
    this.updateFormState = this.updateFormState.bind(this);
  }
  
  /*
  * Update a key/value pair in the form state
   */
  updateFormState(key, value) {
    this.setState(oldState => ({
      form: {
        ...oldState.form,
        [key]: value
      }
    }));
  }
  
  /*
  * Search for a course using the courseQuery
   */
  filterCourses(query) {
    this.setState(oldState => ({
      matchedCourses: this.props.terms.availableCourses[oldState.form.termId].filter(course => course.code.includes(query))
    }))
  }
  
  /*
  * Handle a course code input
   */
  handleCourseSearchInput(event) {
    const query = event.target.value;
    this.updateFormState('courseQuery', query);
    this.filterCourses(query.replace(/ /g, '').toUpperCase());
  }
  
  /*
  * Handle term selection input
   */
  handleTermSelectionInput(termId) {
    this.updateFormState('termId', termId);
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
                  return term.id.toString() === this.state.form.termId.toString()
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
              <Form.Control value={this.state.form.courseQuery} disabled={!this.state.form.termId || !this.props.terms.availableCourses[this.state.form.termId]} onChange={this.handleCourseSearchInput} placeholder="Course"/>
            </Col>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
          
          </Row>
        </Form>
        
        {this.state.matchedCourses.length < 20 &&
        <div>
          {this.state.matchedCourses.map(course => {
            return <p key={course.code}>{course.code} - {course.description}</p>
          })}
        </div>
        }
      
      </div>
    );
  }
}

export default LookupModule;
