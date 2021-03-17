import React, { Component } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton'

 class AcceptanceRules extends Component {
    static displayName = AcceptanceRules.name;
  
    state = {
      makesList: [],
      formSubmitted: false,

    };

    componentDidMount() {
        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakeForManufacturer/honda?format=json", {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
          .then((result) => result.json())
          // .then((result) => console.log('Makes: ', result.Results))
          .then((result) => this.updateMakes(result.Results))
          .catch((e) => console.log(e))
    };

    updateMakes  = (makes) => {
        console.log('Makes: ', makes[0].Make_Name)
         this.setState(prevState => ({
             ...prevState,
             makesList: this.state.makesList.concat(makes.Make_Name),
      
           }));
    };
    

    render() {
        // console.log('Makes List: ', this.props.makesList)
        return (
          <div>
            <h2>Acceptance Rules Form {this.props.username}</h2>
            <Form onSubmit={this.submitCar}>             
              <Form.Label>Make: </Form.Label>
              <DropdownButton 
                type="input"name="make" placeholder="make" onChange={this.handleInputChange} > 
                {this.state.makesList.map(elt => {
                    return (<Dropdown.Item > {elt} </Dropdown.Item>)})} 
              </DropdownButton> 
              <Form.Label>Model: </Form.Label>
              <DropdownButton type="input" name="model" placeholder="model" onChange={this.handleInputChange} />
              <Form.Label>Year: </Form.Label>
              <DropdownButton type="input" name="year" placeholder="year" onChange={this.handleInputChange} />
              <br></br>
              <Button type="submit">Submit</Button>
            </Form>
          </div>
        );
    }
}  

export default AcceptanceRules;