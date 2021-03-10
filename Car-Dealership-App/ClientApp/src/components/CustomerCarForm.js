import React, { Component } from 'react';

export class CustomerCarForm extends Component {
  static displayName = CustomerCarForm.name;

  // constructor(props) {
  //   super(props);
  // }

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
    this.props.addCar(this.state.car);
  }

  render() {
    return (
      <div>
        <h2>Car Form</h2>
        <form onSubmit={this.submitCar}>
          <label>Owner: </label>
          <input type="input" name="owner" placeholder="owner" onChange={this.handleInputChange}></input>
          <label>Make: </label>
          <input name="make" placeholder="make" onChange={this.handleInputChange}></input>
          <label>Model: </label>
          <input name="model" placeholder="model" onChange={this.handleInputChange}></input>
          <label>Year: </label>
          <input name="year" placeholder="year" onChange={this.handleInputChange}></input>
          <label>Color: </label>
          <input name="color" placeholder="color" onChange={this.handleInputChange}></input>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default CustomerCarForm;
