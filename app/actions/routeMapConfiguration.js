export const SET_BUILD = "SET_BUILD";
export const SET_POSTER_NAME = "SET_POSTER_NAME";
export const SET_SCALE_FONT_SIZE = "SET_SCALE_FONT_SIZE";
export const SET_SCALE_LENGTH = "SET_SCALE_LENGTH";
export const SET_MAX_ANCHOR_LINE_LENGTH = "SET_MAX_ANCHOR_LINE_LENGTH";
export const SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE =
    "SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE";
export const SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE =
    "SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE";
export const SET_POINT_MIN_DISTANCE_FROM_TERMINUS =
    "SET_POINT_MIN_DISTANCE_FROM_TERMINUS";
export const SET_INTERMEDIATE_POINT_FONT_SIZE =
    "SET_INTERMEDIATE_POINT_FONT_SIZE";
export const SET_INTERMEDIATE_POINT_MAX_WIDTH =
    "SET_INTERMEDIATE_POINT_MAX_WIDTH";
export const SET_TERMINUS_FONT_SIZE = "SET_TERMINUS_FONT_SIZE";
export const SET_TERMINUS_MAX_WIDTH = "SET_TERMINUS_MAX_WIDTH";
export const SET_STATION_NAME_FONT_SIZE = "SET_STATION_NAME_FONT_SIZE";
export const TOGGLE_ONLY_NEAR_BUSES = "TOGGLE_ONLY_NEAR_BUSES";
export const TOGGLE_ZONE_SYMBOLS = "TOGGLE_ZONE_SYMBOLS";
export const SET_SYMBOL_SIZE = "SET_SYMBOL_SIZE";

export function setBuild(id) {
    return {
        type: SET_BUILD,
        data: id
    };
}

export function setPosterName(name) {
    return {
        type: SET_POSTER_NAME,
        data: name
    };
}

export function setScaleFontSize(value) {
    return {
        type: SET_SCALE_FONT_SIZE,
        data: value
    };
}

export function setScaleLength(length) {
    return {
        type: SET_SCALE_LENGTH,
        data: length
    };
}

export function setMaxAnchorLineLength(length) {
    return {
        type: SET_MAX_ANCHOR_LINE_LENGTH,
        data: length
    };
}

export function setClusterDifferentRoutePointsDistance(length) {
    return {
        type: SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE,
        data: length
    };
}

export function setClusterSameRoutePointsDistance(length) {
    return {
        type: SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE,
        data: length
    };
}

export function setPointMinDistanceFromTerminus(length) {
    return {
        type: SET_POINT_MIN_DISTANCE_FROM_TERMINUS,
        data: length
    };
}

export function setIntermediatePointFontSize(size) {
    return {
        type: SET_INTERMEDIATE_POINT_FONT_SIZE,
        data: size
    };
}

export function setIntermediatePointMaxWidth(width) {
    return {
        type: SET_INTERMEDIATE_POINT_MAX_WIDTH,
        data: width
    };
}

export function setTerminusFontSize(size) {
    return {
        type: SET_TERMINUS_FONT_SIZE,
        data: size
    };
}

export function setTerminusMaxWidth(width) {
    return {
        type: SET_TERMINUS_MAX_WIDTH,
        data: width
    };
}

export function setStationNameFontSize(size) {
    return {
        type: SET_STATION_NAME_FONT_SIZE,
        data: size
    };
}

export function toggleOnlyNearBuses() {
    return {
        type: TOGGLE_ONLY_NEAR_BUSES
    };
}

export function toggleZoneSymbols() {
    return {
        type: TOGGLE_ZONE_SYMBOLS
    };
}

export function setSymbolSize(size) {
    return {
        type: SET_SYMBOL_SIZE,
        data: size
    };
}
