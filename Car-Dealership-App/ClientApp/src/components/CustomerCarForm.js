import React, { Component } from 'react';

export class CustomerCarForm extends Component {
  static displayName = CustomerCarForm.name;

  constructor(props) {
    console.log("Constructor START");
    super(props);
    this.state = {
        value: ''
      };
  }

  render() {
    return (
      <div>
        <form>
            
        </form>
      </div>
    );
  }
}
