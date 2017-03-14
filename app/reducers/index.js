import { combineReducers } from "redux";
import settings from "./settings";
import layers from "./layers";
import mapSelection from "./mapSelection";
import tabName from "./tabName";
import viewport from "./viewport";
import apiRequests from "./apiRequests";
import layout from "./layout";

const rootReducer = combineReducers({
    settings,
    layers,
    mapSelection,
    tabName,
    viewport,
    apiRequests,
    routing,
    layout,
});

export default rootReducer;
