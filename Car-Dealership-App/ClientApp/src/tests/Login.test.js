import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../components/Login'
// import configureMockStore from 'redux-mock-store'
// import { Provider } from 'react-redux'

describe("Login", () => {
    // let appWrapper;
    // beforeAll(() => {
    //     const mockStore = configureMockStore();
    //     const store = mockStore({});
    //     appWrapper = shallow(
    //         <Provider store={store}>
    //             <Login />
    //         </ Provider>);
    // });

    // it("renders without crashing", () => {
    //     const appWrapper = shallow(
    //         <Provider store={store}>
    //             <Login />
    //         </ Provider>);
    // });

    it("has userName and password properties on state", () => {
        const appWrapper = shallow(<Login />);
        const appState = appWrapper.state();

        expect(appState.userName).toBeDefined();
        expect(appState.password).toBeDefined();
    });

    it("has two form controls for username and password", () => {
        const appWrapper = shallow(<Login />);
        const usernameInputs = appWrapper.find(`[type="input"]`);
        const passwordInput = appWrapper.find(`[type="password"]`);

        expect(usernameInputs).toHaveLength(1);
        expect(passwordInput).toHaveLength(1);
    });

    it("has a button for log in", () => {
        const appWrapper = shallow(<Login />);
        const button = appWrapper.find("Button");

        expect(button).toHaveLength(1);
    })
});