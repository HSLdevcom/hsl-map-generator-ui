import { createStore, applyMiddleware, compose } from "redux";
import { persistState } from "redux-devtools"; // eslint-disable-line import/no-extraneous-dependencies
import createLogger from "redux-logger"; // eslint-disable-line import/no-extraneous-dependencies
import thunk from "redux-thunk";
import { hashHistory } from "react-router";
import { routerMiddleware } from "react-router-redux";
import rootReducer from "../reducers";
import DevTools from "../containers/DevTools";

const logger = createLogger({
    level: "info",
    collapsed: true,
});

const router = routerMiddleware(hashHistory);

const enhancer = compose(
    applyMiddleware(thunk, router, logger),
    DevTools.instrument(),
    persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/),
    ),
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);

    if (module.hot) {
        module.hot.accept("../reducers", () =>
            store.replaceReducer(require("../reducers")), // eslint-disable-line global-require
        );
    }

    return store;
}
