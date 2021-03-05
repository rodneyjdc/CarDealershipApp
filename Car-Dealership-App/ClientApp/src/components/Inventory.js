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
    let carOne = {make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd'};
    let carTwo = {make: 'BMW', model: '325Ci', year: 2002, owner: 'Bill'};
    this.setState({
      listedCars: this.state.listedCars.push(carOne, carTwo),
      currentCount: this.state.listedCars.length
    });
  }

  render() {
    return (
      <div>
        <h1>Inventory</h1>
        <p aria-live="polite">Listed Cars: <strong>{this.state.currentCount}</strong></p>        
      </div>
    );
  }
}
