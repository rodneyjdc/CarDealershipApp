import React from 'react'
import { shallow } from 'enzyme'
import CustomerCarForm from '../components/CustomerCarForm'

describe('CustomerCarForm', () => {

  // foundation
  it("expect CustomerCarForm to have state", () => {
    const appWrapper = shallow(<CustomerCarForm />);
    expect(appWrapper.state()).not.toBeUndefined();
  });

  // TODO
  // Simulate
  it("expect Submit Button to simulate addCar?", () => {
    //const userCar = { make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd', color: 'Green' };
    // const appWrapper = shallow(<CustomerCarForm/>);
    // const button = shallow(<CustomerCarForm/>).find('button');
    
    // const mockFunction = jest.fn()
    // button.simulate('submit');
    // expect(appWrapper.state('formSubmitted')).toEqual(true);

    const mockOnSubmit = jest.fn();
    const appWrapper = shallow(<CustomerCarForm addCar={mockOnSubmit} />);

    appWrapper.find('button').simulate('click');

    expect(mockOnSubmit).toHaveBeenCalledTimes(0);

  });

//   it('should update form submitted state with button click', () => {
//     const component = mount(<RegistrationForm />);
//     component
//       .find('button#submit_form')
//       .simulate('click');
    
//     expect(component.state('form_submitted')).toEqual(true);
//     component.unmount();
//   });

});