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
    const mockOnSubmit = jest.fn();
    const appWrapper = shallow(<CustomerCarForm addCar={mockOnSubmit} />);

    appWrapper.find('Form').simulate('submit', { preventDefault: () => {} });

    expect(mockOnSubmit.mock.calls.length).toEqual(1);
  });
});