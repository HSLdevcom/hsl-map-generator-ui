import { createStore, applyMiddleware, compose } from "redux";
import { persistState } from "redux-devtools";
import createLogger from "redux-logger";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import DevTools from "../containers/DevTools";

const logger = createLogger({
    level: "info",
    collapsed: true,
});

const enhancer = compose(
    applyMiddleware(thunk, logger),
    DevTools.instrument(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
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
