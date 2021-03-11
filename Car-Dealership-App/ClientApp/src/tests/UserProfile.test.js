import React from 'react'
import { shallow } from 'enzyme'
import UserProfile from '../components/UserProfile'

describe("UserProfile", () => {
    it("renders without crashing", () => {
        const appWrapper = shallow(<UserProfile />);
    });

    it("has state", () => {
        const appWrapper = shallow(<UserProfile />);
        const appState = appWrapper.state();

        expect(appState).not.toBeNull();
    });

    it("has name and carsList property on state", () => {
        const appWrapper = shallow(<UserProfile />);
        const appState = appWrapper.state();

        expect(appState.name).toBeDefined();
        expect(appState.carsList).toBeDefined();
    });

});