import React, { Component } from 'react';

export class Inventory extends Component {
  static displayName = Inventory.name;

  constructor(props) {
    console.log("Constructor START");
    super(props);
    this.state = {
      currentCount: 0,
      listedCars: []
    };
    //this.incrementCounter = this.incrementCounter.bind(this);
    // this.intitializeTestData = this.intitializeTestData.bind(this);
  }

  async componentDidMount() {
    this.intitializeTestData();
    try {
      let result = await fetch('https://localhost:5001/api/Inventory', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept',
          'Content-Type': 'application/json'
        },
        mode: 'no-cors'
      }
      )
      console.log("result", result)
      if (!result.ok)
        throw Error(result.statusText)


      let cars = await result.json();
      console.log("cars", cars)
      var newcarArray = [...this.state.listedCars, cars]
      this.setState({
        // listedCars: this.state.listedCars.push(carOne, carTwo),
        listedCars: newcarArray,
        currentCount: newcarArray.length
      })
    } catch (e) {

    }
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
      // listedCars: this.state.listedCars.push(carOne, carTwo),
      listedCars: newcarArray,
      currentCount: newcarArray.length
    },
      console.log("updated car Arrau", this.state.listedCars)
    );
  }



  listCars = (listedCars) => {
    console.log("listedCars", listedCars)
    const cars = [];
    for (let i = 0; i < listedCars.length; i++) {
      cars.push(
        <div>
          <p>Car: {i}</p>
          <ul>
            <li>Owner: {listedCars[i].owner}</li>
            <li>Make: {listedCars[i].make}</li>
            <li>Model: {listedCars[i].model}</li>
            <li>Year: {listedCars[i].year}</li>
            <li>Color: {listedCars[i].color}</li>
          </ul>
        </div>)
    }
    return cars
  }

  // Component.render() gets called when props/state changes
  // return the virtual DOM
  render() {
    /* let contents = this.state.loading
     ? <p><em>Loading...</em></p>
     : this.listCars(this.state.listedCars);  
       */

    return (
      <div>
        <h1>Inventory</h1>
        <p aria-live="polite">Listed Cars: <strong>{this.state.currentCount}</strong></p>
        {this.listCars(this.state.listedCars)}
      </div>
    );
  }
}
