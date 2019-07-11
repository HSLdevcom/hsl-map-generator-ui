import {fromJSON, toJSON} from "transit-immutable-js";
import {createStore, compose, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import localStorage from "redux-localstorage";

import rootReducer from "../reducers";
import versionReducer from "../reducers/version";

const localStorageEnhancer = localStorage(
    ["version", "viewport", "mapSelection", "settings"],
    {
        serialize: (state) => toJSON(state),
        deserialize: (stateJSON) => {
            const state = fromJSON(stateJSON);
            return state && state.version === versionReducer() ? state : null;
        }
    }
);

const enhancer = compose(
    applyMiddleware(thunk),
    localStorageEnhancer
);

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
