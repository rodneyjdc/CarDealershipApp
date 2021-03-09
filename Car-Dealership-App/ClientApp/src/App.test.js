import React from 'react'
import { shallow } from 'enzyme'
import Inventory from './components/Inventory'
import Layout from './components/Layout'

import App from './App'

describe('App', () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<App />);
  });

  it('renders a Inventory', () => {
    const appWrapper = shallow(<App />);
    const layout = appWrapper.find(Layout);

    expect(layout).toHaveLength(1);
  });
});

 