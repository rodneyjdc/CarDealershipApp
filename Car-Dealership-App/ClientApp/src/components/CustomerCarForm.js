import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap'
import { connect } from "react-redux";
import axios from "axios";


export class CustomerCarForm extends Component {
  static displayName = CustomerCarForm.name;

  state = {
    car: {},
    formSubmitted: false,
    // acceptanceRules: {
    //   year:
    // }
  };

  //state = { selectedFile: null };

  fileChangedHandler = (event) => {
   event.persist();
   this.setState((prevState) => ({
     car: {
       ...prevState.car,
       [event.target.name]: event.target.files[0],   
     },
   }));
  };

  uploadHandler = () => {
    axios.post("my-domain.com/file-upload", this.state.car.image);
    //console.log(this.state.selectedFile);
  };

  handleInputChange = (event) => {
    event.persist();
    this.setState((prevState) => ({
      car: {
        ...prevState.car,
        [event.target.name]: event.target.value,
      },
    }));
  };

  submitCar = (event) => {
    event.preventDefault();
    //console.log("submitCar", this);
    // const isValid = validate(this.state.car);
    // if (isValid) {
    //   this.props.addCar(this.state.car);
    // } else {
    //   alert("Input is not valid.");
    // }

    this.props.addCar(this.state.car);
  };

  render() {
    console.log(this.props.username);
    console.log(this.props);
    return (
      <div>
        <h2>Car Form {this.props.username}</h2>
        <Form onSubmit={this.submitCar}>
          <Form.Label>Owner: </Form.Label>
          <Form.Control
            type="input"
            name="owner"
            placeholder="owner"
            onChange={this.handleInputChange}
          />
          <Form.Label>Make: </Form.Label>
          <Form.Control
            type="input"
            name="make"
            placeholder="make"
            onChange={this.handleInputChange}
          />
          <Form.Label>Model: </Form.Label>
          <Form.Control
            type="input"
            name="model"
            placeholder="model"
            onChange={this.handleInputChange}
          />
          <Form.Label>Year: </Form.Label>
          <Form.Control
            type="input"
            name="year"
            placeholder="year"
            onChange={this.handleInputChange}
          />
          <Form.Label>Color: </Form.Label>
          <Form.Control
            type="input"
            name="color"
            placeholder="color"
            onChange={this.handleInputChange}
          />
          <Form.Label>Image: </Form.Label>
          <Form.Control
            type="file"
            name="image"
            placeholder="image"
            onChange={this.fileChangedHandler}
          />
          <Button onClick={this.uploadHandler}>Upload!</Button>

          <br></br>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
  };
}

export default connect(mapStateToProps)(CustomerCarForm); 
