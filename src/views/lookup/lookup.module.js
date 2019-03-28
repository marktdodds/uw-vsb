import React, { Component } from 'react';
import styles from './lookup.module.css';
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class LookupModule extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      form: {
        course: '',
        term: ''
      }
    };
    
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleTextInput = this.handleTextInput.bind(this);
    this.handleDropdownInput = this.handleDropdownInput.bind(this);
  }
  
  handleTextInput(formKey, event) {
    const value = event.target.value;
    this.setState(oldState => ({
      form: {
        ...oldState.form,
        [formKey]: value
      }
    }));
  }
  
  handleDropdownInput(formKey, eventKey) {
    const dropdownKey = eventKey;
    this.setState(oldState => ({
      form: {
        ...oldState.form,
        [formKey]: dropdownKey
      }
    }));
  }
  
  handleFormSubmit(event) {
    event.preventDefault();
    console.log(this.state.form);
  }
  
  render() {
    return (
      <div className="App">
        {JSON.stringify(this.state.form)}
        <p>Current Term: {this.props.terms.current.name}</p>
        <p>Next Term: {this.props.terms.next.name}</p>
        
        
        <Form onSubmit={this.handleFormSubmit}>
          <Row className={styles.noMargin}>
            <Dropdown onSelect={e => this.handleDropdownInput('term', e)}>
              <Dropdown.Toggle variant="success" id="term-dropdown">
                {(this.props.terms.listings.find(term => {
                  return term.id.toString() === this.state.form.term.toString()
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
              <Form.Control onChange={e => this.handleTextInput('course', e)} placeholder="Course"/>
            </Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          
          </Row>
        </Form>
      
      </div>
    );
  }
}

export default LookupModule;
