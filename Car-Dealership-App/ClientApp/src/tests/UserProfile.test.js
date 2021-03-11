import React from 'react'
import { shallow } from 'enzyme'
import UserProfile from '../components/UserProfile'

describe("UserProfile", () => {
    let appWrapper;
    let location;
    beforeAll(() => {
        location = {state: {
            ownerName: "Bob",
            carsList: [{ make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd', color: 'Green' }]
          }};

        appWrapper = shallow(<UserProfile location={location}/>);
    });
    
    it("renders without crashing", () => {
        const location = {state: {
            ownerName: "Bob",
            carsList: [{ make: 'Cadillac', model: 'DeVille', year: 1998, owner: 'Todd', color: 'Green' }]
          }};

        const appWrapper = shallow(<UserProfile location={location}/>);
    });

    it("has state", () => {
        const appState = appWrapper.state();

        expect(appState).not.toBeNull();
    });

    it("has name and carsList property on state", () => {
        const appState = appWrapper.state();

        expect(appState.name).toBeDefined();
        expect(appState.carsList).toBeDefined();
    });

});