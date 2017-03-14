import { fromJSON, toJSON } from "transit-immutable-js";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import localStorage from "redux-localstorage";

import rootReducer from "../reducers";

const localStorageEnhancer = localStorage(
    ["viewport", "mapSelection", "layers", "settings"],
    {
        serialize: state => toJSON(state),
        deserialize: state => fromJSON(state),
    },
);

const enhancer = compose(applyMiddleware(thunk), localStorageEnhancer);

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState, enhancer);
}
