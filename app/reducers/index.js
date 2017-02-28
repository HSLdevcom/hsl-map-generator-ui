import { combineReducers } from "redux";
import { routerReducer as routing } from "react-router-redux";
import layers from "./layers";
import mapSelection from "./mapSelection";
import tabName from "./tabName";
import viewport from "./viewport";
import apiRequests from "./apiRequests";
import layout from "./layout";

const rootReducer = combineReducers({
    layers,
    mapSelection,
    tabName,
    viewport,
    apiRequests,
    routing,
    layout,
});

export default rootReducer;
