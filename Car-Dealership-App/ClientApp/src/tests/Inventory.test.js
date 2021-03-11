import React from 'react'
import { shallow } from 'enzyme'
import CustomerCarForm from '../components/CustomerCarForm'
import Inventory from '../components/Inventory';

describe('Inventory', () => {
  it('renders without crashing', () => {
    const appWrapper = shallow(<Inventory />);
  });

  // Inventory should contain CustomerCarForm
  it('renders a CustomerCarForm', () => {
    const appWrapper = shallow(<Inventory />);
    const customerCarForm = appWrapper.find(CustomerCarForm);
    expect(customerCarForm).toHaveLength(1);
  });

  // Checking for Inventory state
  it("has state", () => {
      const appWrapper = shallow(<Inventory />);
      const appState = appWrapper.state();
      expect(appState).not.toBeNull();
  });

  // Inventory state has currentCount and listedCars properties
  it("has currentCount property on state", () => {
      const appWrapper = shallow(<Inventory />);
      const appState = appWrapper.state();
      //expect(appState.currentCount).not.toBeUndefined();
      expect(appState.listedCars).not.toBeUndefined();
  });

//   // Inventory passes mergeInvetory() function to CustomerCarForm
//   it("passes mergeInventory to CustomerCarForm", () => {
//       const appWrapper = shallow(<Inventory />);
//       const customerCarForm = appWrapper.find(CustomerCarForm);

//       // check if functions exists by spying

//       // check for equality
//       expect(customerCarForm.props().addCar).toBeUndefined;
//   });

  // function a exist
  // check if addCar function exists?
  it("check if addCar property exist on CustomerCarForm", () => {
    const appWrapper = shallow(<Inventory />);
    const customerCarForm = appWrapper.find(CustomerCarForm);   
    // check if functions exists by spying    
    // check for equality
    expect(customerCarForm.props().addCar).not.toBeUndefined();
  });

  // calling function b calls function a
  it("invoking addCar updates listedCars property of state", () => {
    const appWrapper = shallow(<Inventory />);
    const customerCarForm = appWrapper.find(CustomerCarForm);
    const initialLength = appWrapper.state().listedCars.length;
    const sampleCar = { make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd', color: 'Green' };
    customerCarForm.invoke('addCar')(sampleCar);
    expect(appWrapper.state().listedCars.length).toBe(initialLength + 1);
    //expect(customerCarForm.props().addCar).toHaveBeenCalled();
        // .then(() => {
        //    
        //     expect(customerCarForm.props().addCar).toHaveBeenCalled();
        // }) 
  });

});