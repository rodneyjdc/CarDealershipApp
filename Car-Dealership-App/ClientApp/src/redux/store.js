import { createStore as reduxCreateStore, applyMiddleware } from "redux";  //
import { composeWithDevTools } from "redux-devtools-extension";



// action types
export const USERNAME = "USERNAME"

export const ISADMIN = "ISADMIN"

export const ISLOGIN = "ISLOGIN"

export const ACCEPTANCERULES = "ACCEPTANCERULES"


// action creators
export function changeUSERNAME(val) {
  return { type: USERNAME, val };
}

export function changeADMINSTATUS(val) {
    return { type: ISADMIN, val };
}

export function changeLOGINSTATUS(val) {
return { type: ISLOGIN, val };
}

// let nextRule = 0;
// export function changeRULES(val) {
//   return { 
//     type: ACCEPTANCERULES, 
//     payload: {
//       id: ++nextRule,
//       val
//     }};
//   }

export function changeRULES(val) {
  return { type: ACCEPTANCERULES, val };
  }



// reducer
const reducer = (state, action) => {
    switch (action.type) {
      case USERNAME:
        return {
          ...state,
          username: action.val,
        };
        case ISADMIN:
            return {
              ...state,
              isAdmin: action.val,
        };
        case ISLOGIN:
        return {
          ...state,
          login: action.val,
        };
        case ACCEPTANCERULES:
        return {
          ...state,
          acceptanceRules: state.acceptanceRules.concat([action.val]),
        };
      default:
        return state;
    }
}


// initial state
const initialState = {
    username: undefined,
    isAdmin: false,
    isLogin: false,
    acceptanceRules: []
}

// store
const createStore = () =>
    reduxCreateStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
    
export default createStore;
