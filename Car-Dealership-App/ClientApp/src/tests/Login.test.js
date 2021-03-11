import React from 'react'
import { shallow } from 'enzyme'
import Login from '../components/Login'

describe("Login", () => {
    it("renders without crashing", () => {
        const appWrapper = shallow(<Login />);
    });

    it("has userName and password properties on state", () => {
        const appWrapper = shallow(<Login />);
        const appState = appWrapper.state();

        expect(appState.userName).toBeDefined();
        expect(appState.password).toBeDefined();
    });

    it("has two inputs for userName and password", () => {
        const appWrapper = shallow(<Login />);
        const inputs = appWrapper.find("input");

        expect(inputs).toHaveLength(2);
    });

    it("has a button for log in", () => {
        const appWrapper = shallow(<Login />);
        const button = appWrapper.find("button");

        expect(button).toHaveLength(1);
    })
});