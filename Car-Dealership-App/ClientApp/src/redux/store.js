import { createStore as reduxCreateStore, applyMiddleware } from "redux";  //
import { composeWithDevTools } from "redux-devtools-extension";



// action types
export const USERNAME = "USERNAME"



// action creators
export function changeUSERNAME(val) {
  return { type: USERNAME, val };
}



// reducer
const reducer = (state, action) => {
    switch (action.type) {
      case USERNAME:
        return {
          ...state,
          username: action.val,
        };
      default:
        return state;
    }
}


// initial state
const initialState = {
    username: 'none',
}

// store
const createStore = () =>
    reduxCreateStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
    
export default createStore;
