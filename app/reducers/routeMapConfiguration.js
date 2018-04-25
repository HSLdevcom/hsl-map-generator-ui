import { fromJS } from "immutable";
import moment from "moment";
import {
    SET_BUILD,
    SET_DATE,
    SET_POSTER_NAME,
    SET_SHOW_SCALE,
    SET_SCALE_LENGTH,
    SET_MAX_ANCHOR_LINE_LENGTH,
    SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE,
    SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE,
    SET_POINT_MIN_DISTANCE_FROM_TERMINUS,
} from "../actions/routeMapConfiguration";

const initialState = fromJS({
    build: null,
    date: moment().format("YYYY-MM-DD"),
    posterName: "",
    showScale: true,
    scaleLength: 1000,
    maxAnchorLineLength: 250,
    clusterDifferentRoutePointsDistance: 20,
    clusterSameRoutePointsDistance: 1000,
    pointMinDistanceFromTerminus: 100,
});

export default function routeMapConfiguration(state = initialState, action) {
    switch (action.type) {
        case SET_BUILD:
            return state.set("build", action.data);
        case SET_DATE:
            return state.set("date", action.data);
        case SET_POSTER_NAME:
            return state.set("posterName", action.data);
        case SET_SHOW_SCALE:
            return state.set("showScale", action.data);
        case SET_SCALE_LENGTH:
            return state.set("scaleLength", action.data);
        case SET_MAX_ANCHOR_LINE_LENGTH:
            return state.set("maxAnchorLineLength", action.data);
        case SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE:
            return state.set("clusterDifferentRoutePointsDistance", action.data);
        case SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE:
            return state.set("clusterSameRoutePointsDistance", action.data);
        case SET_POINT_MIN_DISTANCE_FROM_TERMINUS:
            return state.set("pointMinDistanceFromTerminus", action.data);
        default:
            return state;
    }
}
