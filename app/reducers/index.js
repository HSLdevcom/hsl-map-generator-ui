import { combineReducers } from "redux";
import settings from "./settings";
import layers from "./layers";
import mapSelection from "./mapSelection";
import tabName from "./tabName";
import viewport from "./viewport";
import apiRequests from "./apiRequests";
import layout from "./layout";

const rootReducer = combineReducers({
    version: () => 3,
    settings,
    layers,
    mapSelection,
    tabName,
    viewport,
    apiRequests,
    layout,
});

export default rootReducer;
