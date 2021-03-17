import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
// import { FetchData } from './components/FetchData';
import { Inventory } from './components/Inventory';
import { UserProfile } from './components/UserProfile';
import Login  from './components/Login';
import AcceptanceRules from './components/AcceptanceRules';


import './custom.css'
import CustomerCarForm from './components/CustomerCarForm';
import  SignUp  from './components/SignUp';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/userProfile' component={UserProfile} />
        <Route path='/inventory' component={Inventory} />
        <Route path='/customerCarForm' component={CustomerCarForm} />
        <Route path='/acceptanceRules' component={AcceptanceRules} />
        <Route path='/signUp' component={SignUp} />
        <Route path='/login' component={Login} />
      </Layout>
    );
  }
}
