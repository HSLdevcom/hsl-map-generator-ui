import { combineReducers } from "redux";
import version from "./version";
import settings from "./settings";
import layers from "./layers";
import mapSelection from "./mapSelection";
import modeSelection from "./modeSelection";
import tabName from "./tabName";
import viewport from "./viewport";
import apiRequests from "./apiRequests";
import layout from "./layout";
import publisherRequests from "./publisherRequests";
import routeMapConfiguration from "./routeMapConfiguration";

const rootReducer = combineReducers({
    version,
    settings,
    layers,
    mapSelection,
    modeSelection,
    tabName,
    viewport,
    apiRequests,
    layout,
    publisherRequests,
    routeMapConfiguration,
});

export default rootReducer;
