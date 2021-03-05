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
    this.intitializeTestData = this.intitializeTestData.bind(this);
  }

  componentDidMount() {
    this.intitializeTestData();
  }

  intitializeTestData()
  {
    let carOne = {make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd', color: 'Green'};
    let carTwo = {make: 'BMW', model: '325Ci', year: 2002, owner: 'Bill', color: 'White'};
    this.setState({
      listedCars: this.state.listedCars.push(carOne, carTwo),
      currentCount: this.state.listedCars.length
    });
  }

  listCars = () => {
    // for (let i = 0; i < this.state.listedCars.length; i++) {
    //   <div>
    //     <p>Car: {i}</p>
    //     <ul>
    //       <li>Owner: {this.state.listedCars[i].owner}</li>
    //       <li>Make: {this.state.listedCars[i].make}</li>
    //       <li>Model: {this.state.listedCars[i].model}</li>
    //       <li>Year: {this.state.listedCars[i].year}</li>
    //       <li>Color: {this.state.listedCars[i].color}</li>
    //     </ul>
    //   </div>
    // }
  }

  render() {
    return (
      <div>
        <h1>Inventory</h1>
        <p aria-live="polite">Listed Cars: <strong>{this.state.currentCount}</strong></p> 
        {this.listCars()}     
      </div>
    );
  }
}
