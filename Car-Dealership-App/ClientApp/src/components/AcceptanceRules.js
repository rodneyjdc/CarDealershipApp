import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { connect } from "react-redux";

class AcceptanceRules extends Component {
  static displayName = AcceptanceRules.name;

  state = {

    formSubmitted: false,
    make: "",
    model: "",
    year: 0,
    modelsList: [],
    makesList: []

  };

  componentDidMount() {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/honda?format=json", {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((result) => result.json())
      // .then((result) => console.log("Result from API: ", result))
      .then((result) => this.updateMakes(result.Results))
      .catch((e) => console.log(e))
  };

  updateMakes = (makes) => {
    //const { makesName }
    const resultingMakes = makes.map((item) => {
      return item.Make_Name;
    });

    //let makesUniqueSet = new Set(resultingMakes);
    let makesUniqueArray = [...new Set(resultingMakes)];

    this.setState(prevState => ({
      ...prevState,
      makesList: makesUniqueArray,
    }));

    console.log("Inside updateMakes: ", makesUniqueArray);
  };

  setMake = (event) => {
    //console.log("Inside setMake: ", event);
    this.setState(prevState => ({
      ...prevState,
      make: event
    }));

  }

  getModelsOfMake = (make) => {
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${make}?format=json`;

    fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((result) => result.json())
      // .then((result) => console.log("Result from API: ", result))
      .then((result) => this.updateModels(result.Results))
      .catch((e) => console.log(e))
  }

  updateModels = (models) => {
    const resultingModels = models.map((item) => {
      return item.Model_Name;
    });

    let modelsUniqueArray = [...new Set(resultingModels)];

    this.setState(prevState => ({
      ...prevState,
      modelsList: modelsUniqueArray,
    }));

    //console.log("Inside updateModels modelsUniqueArray: ", modelsUniqueArray);
    //console.log("Inside updateModels: ", this.state.modelsList);
  };

  setModel = (event) => {
    this.setState(prevState => ({
      ...prevState,
      model: event
    }));
  }

  setYear = (event) => {
    event.persist();
    this.setState(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }))
  }

  displayModel = () => {
    this.getModelsOfMake(this.state.make);
    //console.log("inside displayModel ",this.state.modelsList);
    return (
      <>
        <Form.Label>Model: </Form.Label>
        <DropdownButton
          title="Choose a Model"
          type="input"
          name="model"
          placeholder="model"
        >
          {this.state.modelsList.map(elt => {
            return (<Dropdown.Item eventKey={elt} onSelect={(event) => this.setModel(event)}> {elt} </Dropdown.Item>)
          })}
        </DropdownButton>
      </>
    )
  }

  displayYear = () => {
    return (
      <>
        <Form.Label>Year: </Form.Label>
        <Form.Control type="input" name="year" placeholder="year"
          onChange={this.setYear} />
      </>
    )
  }

  displayButton = () => {
    return (
      <>
        <p>{this.state.make}</p>
        <p>{this.state.model}</p>
        <p>{this.state.year}</p>
        <Button type="submit">Submit</Button>
      </>
    )
  }

  submitAcceptanceRule = (event) => {
    event.preventDefault();
    const newRule = {
      make:this.state.make,
      model: this.state.model,
      year: this.state.year
    };

    //make api call here
    fetch("http://localhost:5000/mongo/api/rules", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newRule),
    })
      .then((result) => result.json())
      .then((result) => console.log("result", result))
      .catch((e) => console.log(e));
   // this.props.dispatch(changeRULES(rule));
  }

  render() {
    // console.log("Make: ", this.state.make);
    // console.log("Model: ", this.state.model);
    // console.log("Year ", this.state.year);
    return this.props.isAdmin ? (
      <div>
        <h2>Acceptance Rules Form </h2>
        <p><em>*Currently manufacturer is hardcoded to be Honda*</em></p>
        <Form onSubmit={this.submitAcceptanceRule}>
          <Form.Label>Make: </Form.Label>
          <DropdownButton
            title="Choose a Make"
            type="input"
            name="make"
            placeholder="make"
          >
            {this.state.makesList.map(elt => {
              return (<Dropdown.Item eventKey={elt} onSelect={(event) => this.setMake(event)}> {elt} </Dropdown.Item>)
            })}
          </DropdownButton>
          <br></br>
          {this.state.make && this.displayModel()}
          <br></br>
          {this.state.model && this.displayYear()}
          <br></br>

          {this.state.make && this.state.model && this.displayButton()}
        </Form>
      </div>
    ) : (
      <div>
        <h1> Sorry, you do not have access to this page. </h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    username: state.username,
    isAdmin: state.isAdmin,
    acceptanceRules: state.acceptanceRules
  };
}

export default connect(mapStateToProps)(AcceptanceRules); 
