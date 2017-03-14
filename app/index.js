import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import webfontloader from "webfontloader";

import App from "./containers/App";
import Home from "./components/Home";
import configureStore from "./store/configureStore";
import "./app.global.css";

const root = document.body.appendChild(document.createElement("div"));

const store = configureStore();

webfontloader.load({
    google: { families: ["Nunito:700,400,300"] },
});

render(
    <Provider store={store}>
        <App>
            <Home/>
        </App>
    </Provider>,
    root,
);
