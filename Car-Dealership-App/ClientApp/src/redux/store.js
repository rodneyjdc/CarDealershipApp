import { createStore as reduxCreateStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// action types
export const LANG = "LANG"



// action creators
export function changeLANG(val) {
    return { type: LANG, val }
}



// reducer
const reducer = (state, action) => {
    switch (action.type) {
        case LANG:
            return {
                ...state,
                lang: action.val
            }
        default:
            return state;
    }
}


// initial state
const initialState = {
    lang: 'none',
}

// store
const createStore = () =>
    reduxCreateStore(reducer, initialState, composeWithDevTools(applyMiddleware()));
export default createStore;
