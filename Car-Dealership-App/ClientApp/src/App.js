import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Inventory } from './components/Inventory';

import './custom.css'
import { CustomerCarForm } from './components/CustomerCarForm';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/inventory' component={Inventory} />
        <Route path='/customerCarForm' component={CustomerCarForm} />
        <Route path='/fetch-data' component={FetchData} />
      </Layout>
    );
  }
}
