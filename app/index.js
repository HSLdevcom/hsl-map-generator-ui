import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, hashHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import routes from "./routes";
import configureStore from "./store/configureStore";
import webfontloader from "webfontloader";
import "./app.global.css";

const root = document.body.appendChild(document.createElement("div"));

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

webfontloader.load({
  google: { families: ["Nunito:700,400,300"] }
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  root
);
