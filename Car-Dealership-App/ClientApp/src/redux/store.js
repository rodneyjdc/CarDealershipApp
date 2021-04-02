import { createStore as reduxCreateStore, applyMiddleware } from "redux";  //
import { composeWithDevTools } from "redux-devtools-extension";



// action types
export const USERNAME = "USERNAME"

export const FIRSTNAME = "FIRSTNAME"

export const ISADMIN = "ISADMIN"

export const LOGGEDIN = "LOGGEDIN"

export const ACCEPTANCERULES = "ACCEPTANCERULES"

export const CURRENTUSER = "CURRENTUSER"


// action creators
export function changeUSERNAME(val) {
  return { type: USERNAME, val };
}

export function changeFIRSTNAME(val) {
  return { type: FIRSTNAME, val };
}

export function changeADMINSTATUS(val) {
  return { type: ISADMIN, val };
}

export function changeLOGINSTATUS(val) {
  return { type: LOGGEDIN, val };
}

export function changeCURRENTUSER(val) {
  return { type: CURRENTUSER, val };
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
    case FIRSTNAME:
      return {
        ...state,
        firstName: action.val,
      };
    case ISADMIN:
      return {
        ...state,
        isAdmin: action.val,
      };
    case LOGGEDIN:
      return {
        ...state,
        loggedIn: action.val,
      };
    case CURRENTUSER:
      return {
        ...state,
        currentUser: action.val,
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
  firstName: undefined,
  isAdmin: false,
  loggedIn: false,
  acceptanceRules: [],
  currentUser: undefined
}

// store
const createStore = () =>
  reduxCreateStore(reducer, initialState, composeWithDevTools(applyMiddleware()));

export default createStore;
