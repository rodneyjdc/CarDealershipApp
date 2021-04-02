import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <h1>Welcome to the Car Dealership App!</h1>
        <div class="px-4 py-5 my-5 text-center">
          <img class="d-block mx-auto mb-4" src="https://t3.ftcdn.net/jpg/03/20/08/76/240_F_320087635_XqajOViXr2CA3nCbjFvvCKRlsFAwqAbD.jpg" alt="" width="720" height="370"/>
          <h1 class="display-5 fw-bold">Our Team</h1>
          <div class="col-lg-6 mx-auto">
            <p class="lead mb-4">Car Dealership App is own by <b>Runtime Terror</b> group, a team of 3 advocate and dedicate
              wroker ready to help you anytime, anywhere and at no cost. Your satisfaction is our priority.  
              By adding your car in our listing you can consider it sell at the best price available in the market.</p>
            <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            {/* <Link to={{ pathname: '/customerCarForm', }} class="btn btn-outline-secondary btn-lg px-4"> Sell-My-Car </Link> */}
            <Link to={{ pathname: '/login', }} class="btn btn-primary btn-lg px-4 me-sm-3"> Login </Link> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
