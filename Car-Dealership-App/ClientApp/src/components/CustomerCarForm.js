import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap'
import { connect } from "react-redux";
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton';

export class CustomerCarForm extends Component {
  static displayName = CustomerCarForm.name;

  state = {
    car: {},
    formSubmitted: false,
    rulesList: [],
    makeList: [],
    modelList: [],
    yearList: []
    // acceptanceRules: {
    //   year:
    // }
  };

  //state = { selectedFile: null };

  componentDidMount() {
    this.getRules();
  };
  getRules() {
    fetch("http://localhost:5000/mongo/api/rules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      // body: JSON.stringify(newRule),
    })

      .then((result) => result.json())
      //.then((result) => console.log("Result from API: ", result))
      .then((result) => this.updateRules(result))
      .catch((e) => console.log(e))
  }
  updateRules = (rules) => {
    this.setState(prevState => ({
      ...prevState,
      rulesList: rules,
    }));

    let makesUniqueArray = [...new Set(rules.map(item => item.make))];
    this.setState(prevState => ({
      ...prevState,
      makeList: makesUniqueArray,
    }));

    console.log("Inside updateMakes: ", this.state.makeList);
  };
  setMake = (event) => {
    this.setState(prevState => ({
      ...prevState,
      make: event
    }));

    // set model
    let models = this.state.rulesList.filter(x => x.make == event);
    let makesUniqueArray = [...new Set(models.map(item => item.model))];
    this.setState(prevState => ({
      ...prevState,
      modelList: makesUniqueArray,
    }));

  }
  setModel = (event) => {
    this.setState(prevState => ({
      ...prevState,
      model: event
    }));

    // set year
    let models = this.state.rulesList.filter(x => x.make == this.state.make && x.model==event);
    let makesUniqueArray = [...new Set(models.map(item => item.year))];
    this.setState(prevState => ({
      ...prevState,
      yearList: makesUniqueArray,
    }));
  }
  setYear = (event) => {
    this.setState(prevState => ({
      ...prevState,
      year: event
    }));
  }
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
          <Form.Label>Make: {this.state.make} </Form.Label>
          <DropdownButton
            title="Choose a Make"
            type="input"
            name="make"
            placeholder="make"
          >
            {this.state.makeList.map(elt => {
              return (<Dropdown.Item eventKey={elt} onSelect={(event) => this.setMake(event)}> {elt} </Dropdown.Item>)
            })}
          </DropdownButton>
          {/* <Form.Control
            type="input"
            name="make"
            placeholder="make"
            onChange={this.handleInputChange}
          /> */}
          <Form.Label>Model: {this.state.model} </Form.Label>
          <DropdownButton
            title="Choose a Model"
            type="input"
            name="model"
            placeholder="model"
          >
            {this.state.modelList.map(elt => {
              return (<Dropdown.Item eventKey={elt} onSelect={(event) => this.setModel(event)}> {elt} </Dropdown.Item>)
            })}
          </DropdownButton>
          
          {/* <Form.Control
            type="input"
            name="model"
            placeholder="model"
            onChange={this.handleInputChange}
          /> */}
          <Form.Label>Year: {this.state.year} </Form.Label>
          <DropdownButton
            title="Choose a Year"
            type="input"
            name="year"
            placeholder="year"
          >
            {this.state.yearList.map(elt => {
              return (<Dropdown.Item eventKey={elt} onSelect={(event) => this.setYear(event)}> {elt} </Dropdown.Item>)
            })}
          </DropdownButton>
          {/* <Form.Control
            type="input"
            name="year"
            placeholder="year"
            onChange={this.handleInputChange}
          /> */}
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
