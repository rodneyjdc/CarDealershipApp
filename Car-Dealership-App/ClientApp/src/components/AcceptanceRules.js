import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { isTemplateSpan } from 'typescript';

class AcceptanceRules extends Component {
  static displayName = AcceptanceRules.name;

  state = {
    
    formSubmitted: false,
    make: "",
    model: "",
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

  displayModel = () => {
    this.getModelsOfMake(this.state.make);
    //console.log("inside displayModel ",this.state.modelsList);
    return (
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
    )
  }

  render() {
    //console.log("Make: ", this.state.make);
    //console.log("Model: ", this.state.model);
    return (
      <div>
        <h2>Acceptance Rules Form {this.props.username}</h2>
        <Form onSubmit={this.submitCar}>
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
          <Form.Label>Model: </Form.Label>

          {/* {this.state.make && this.displayModel()} */}
          {this.state.make ? this.displayModel()
            : (<h3>Please choose a make</h3>)}

          <br></br>
          <Form.Label>Year: </Form.Label>
          <Form.Control type="input" name="year" placeholder="year" />
          <br></br>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default AcceptanceRules;