import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'

export class CustomerCarForm extends Component {
  static displayName = CustomerCarForm.name;

  state = {
    car: {},
    formSubmitted: false
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState(prevState => ({
      car: {
        ...prevState.car,
        [event.target.name]: event.target.value
      }
    }))
  }

  submitCar = (event) => {
    event.preventDefault();
    //console.log("submitCar", this);
  
    this.props.addCar(this.state.car);
  }

  render() {
    return (
      <div>
        <h2>Car Form</h2>
        <Form onSubmit={this.submitCar}>
          <Form.Label>Owner: </Form.Label>
          <Form.Control type="input" name="owner" placeholder="owner" onChange={this.handleInputChange}/>
          <Form.Label>Make: </Form.Label>
          <Form.Control type="input"name="make" placeholder="make" onChange={this.handleInputChange} />
          <Form.Label>Model: </Form.Label>
          <Form.Control type="input" name="model" placeholder="model" onChange={this.handleInputChange} />
          <Form.Label>Year: </Form.Label>
          <Form.Control type="input" name="year" placeholder="year" onChange={this.handleInputChange} />
          <Form.Label>Color: </Form.Label>
          <Form.Control type="input" name="color" placeholder="color" onChange={this.handleInputChange} />
          <br></br>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default CustomerCarForm;
