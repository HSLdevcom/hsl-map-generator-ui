import {fromJS} from "immutable";
import {createRoutemapConfigurationOptions} from "../utils/map-utils";
import {
    SET_BUILD,
    SET_POSTER_NAME,
    SET_ROUTE_FILTER,
    SET_SCALE_FONT_SIZE,
    SET_SCALE_LENGTH,
    SET_MAX_ANCHOR_LINE_LENGTH,
    SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE,
    SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE,
    SET_POINT_MIN_DISTANCE_FROM_TERMINUS,
    SET_INTERMEDIATE_POINT_FONT_SIZE,
    SET_INTERMEDIATE_POINT_MAX_WIDTH,
    SET_TERMINUS_FONT_SIZE,
    SET_TERMINUS_MAX_WIDTH,
    SET_STATION_NAME_FONT_SIZE,
    TOGGLE_ONLY_NEAR_BUSES,
    TOGGLE_ZONE_SYMBOLS,
    SET_SYMBOL_SIZE,
    LOAD_STATE,
    TOGGLE_JORE_ID_FILTERING
} from "../actions/routeMapConfiguration";

const initialState = fromJS({
    build: null,
    posterName: "",
    routeFilter: [],
    scaleLength: 200,
    scaleFontSize: 12,
    maxAnchorLineLength: 60,
    clusterDifferentRoutePointsDistance: 20,
    clusterSameRoutePointsDistance: 1000,
    pointMinDistanceFromTerminus: 100,
    intermediatePointFontSize: 9,
    intermediatePointWidth: 50,
    terminusFontSize: 13,
    terminusWidth: 170,
    stationFontSize: 12,
    onlyNearBuses: false,
    zoneSymbols: false,
    symbolSize: "200px",
    useJoreId: false
});

export default function routeMapConfiguration(state = initialState, action) {
    switch (action.type) {
        case SET_BUILD:
            return state.set("build", action.data);
        case SET_POSTER_NAME:
            return state.set("posterName", action.data);
        case SET_ROUTE_FILTER:
            return state.set("routeFilter", action.data);
        case SET_SCALE_LENGTH:
            return state.set("scaleLength", action.data);
        case SET_SCALE_FONT_SIZE:
            return state.set("scaleFontSize", action.data);
        case SET_MAX_ANCHOR_LINE_LENGTH:
            return state.set("maxAnchorLineLength", action.data);
        case SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE:
            return state.set(
                "clusterDifferentRoutePointsDistance",
                action.data
            );
        case SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE:
            return state.set("clusterSameRoutePointsDistance", action.data);
        case SET_POINT_MIN_DISTANCE_FROM_TERMINUS:
            return state.set("pointMinDistanceFromTerminus", action.data);
        case SET_INTERMEDIATE_POINT_FONT_SIZE:
            return state.set("intermediatePointFontSize", action.data);
        case SET_INTERMEDIATE_POINT_MAX_WIDTH:
            return state.set("intermediatePointWidth", action.data);
        case SET_TERMINUS_FONT_SIZE:
            return state.set("terminusFontSize", action.data);
        case SET_TERMINUS_MAX_WIDTH:
            return state.set("terminusWidth", action.data);
        case SET_STATION_NAME_FONT_SIZE:
            return state.set("stationFontSize", action.data);
        case TOGGLE_ONLY_NEAR_BUSES:
            return state.set("onlyNearBuses", !state.get("onlyNearBuses"));
        case TOGGLE_ZONE_SYMBOLS:
            return state.set("zoneSymbols", !state.get("zoneSymbols"));
        case SET_SYMBOL_SIZE:
            return state.set("symbolSize", action.data);
        case LOAD_STATE: {
            const routeConfig = createRoutemapConfigurationOptions(
                action.state.routeMapConfiguration
            );
            let newState = state;
            Object.keys(routeConfig).forEach((key) => {
                newState = newState.set(key, routeConfig[key]);
            });
            return newState;
        }
        case TOGGLE_JORE_ID_FILTERING: {
            return state.set("useJoreId", !state.get("useJoreId"));
        }
        default:
            return state;
    }
}
