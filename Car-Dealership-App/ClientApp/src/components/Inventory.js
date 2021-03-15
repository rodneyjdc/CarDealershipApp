import React, { Component } from 'react';
import CustomerCarForm from './CustomerCarForm';
import { Card, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import DropdownButton from 'react-bootstrap/DropdownButton'

export class Inventory extends Component {
  static displayName = Inventory.name;

  constructor(props) {
    super(props);
    this.state = {
      listedCars: []
    };
  }

  componentDidMount() {
    this.intitializeTestData();
    fetch("https://localhost:5001/api/Inventory", {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((result) => result.json())
      .then((result) => this.mergeInventory(result))
      .catch((e) => console.log(e))
  }

  mergeInventory = (cars) => {
    // console.log("mergeInventory", cars);
    // console.log("mergeInventory1", this.state);
    // console.log("mergeInventory2", this.state.listedCars);

    this.setState(prevState => ({
      ...prevState,
      listedCars: this.state.listedCars.concat(cars),

    }));
  }



  //.push() returns a length of the array, so newCard is not an array but integer.
  // But because setState is asynchronous, it doesn’t update immediately, 
  // but when React feels like it. And because you mutate state directly when you console.log() you see that this.state.card is an array, but after that it gets updated and when you try to call .map() on integer you get an error.

  intitializeTestData() {
    let carOne = { make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd', color: 'Green' };
    let carTwo = { make: 'BMW', model: '325Ci', year: 2002, owner: 'Bill', color: 'White' };

    // var newCard = [...this.state.listedCars, carOne,carTwo ];  working too
    var newcarArray = this.state.listedCars.slice();
    newcarArray.push(carOne, carTwo);

    this.setState({
      listedCars: newcarArray,
      currentCount: newcarArray.length
    },
      // console.log("updated car Arrau", this.state.listedCars)
    );
  }

  listCars = (listedCars) => {
    // console.log("listedCars", listedCars)
    const cars = [];
    for (let i = 0; i < listedCars.length; i++) {
      cars.push(
        <div key={i}>
          <Container width="100vh">
            <Card style={{ width: '30vw' }}>
              <Card.Body>
                <Card.Title>Car: {i + 1}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <Link to={{
                    pathname: '/userProfile',
                    state: {
                      ownerName: listedCars[i].owner,
                      carsList: this.state.listedCars
                    }
                  }}>Owner: {listedCars[i].owner}</Link>
                </Card.Subtitle>
                <Card.Text>
                  <Container>
                    <Row>Make: {listedCars[i].make}</Row>
                    <Row>Model: {listedCars[i].model}</Row>
                    <Row>Year: {listedCars[i].year}</Row>
                    <Row>Color: {listedCars[i].color}</Row>
                  </Container>
                </Card.Text>
                <Card.Link href="#">Card Link</Card.Link>
                <Card.Link href="#">Another Link</Card.Link>
              </Card.Body>
            </Card>
          </Container>
        </div>
      )
    }
    return cars
  }

  render() {
    return (
      <div>
        <CustomerCarForm addCar={this.mergeInventory} />
        <br></br>
        <hr></hr>
        <h2>Inventory</h2>
        <p aria-live="polite">Listed Cars: <strong>{this.state.listedCars.length}</strong></p>
        {this.listCars(this.state.listedCars)}
      </div>
    );
  }
}

export default Inventory;
