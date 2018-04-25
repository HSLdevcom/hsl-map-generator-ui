export const SET_BUILD = "SET_BUILD";
export const SET_DATE = "SET_DATE";
export const SET_POSTER_NAME = "SET_POSTER_NAME";
export const SET_SHOW_SCALE = "SET_SHOW_SCALE";
export const SET_SCALE_LENGTH = "SET_SCALE_LENGTH";
export const SET_MAX_ANCHOR_LINE_LENGTH = "SET_MAX_ANCHOR_LINE_LENGTH";
export const SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE = "SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE";
export const SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE = "SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE";
export const SET_POINT_MIN_DISTANCE_FROM_TERMINUS = "SET_POINT_MIN_DISTANCE_FROM_TERMINUS";

export function setBuild(id) {
    return {
        type: SET_BUILD,
        data: id,
    };
}

export function setDate(date) {
    return {
        type: SET_DATE,
        data: date,
    };
}

export function setPosterName(name) {
    return {
        type: SET_POSTER_NAME,
        data: name,
    };
}

export function setShowScale(value) {
    return {
        type: SET_SHOW_SCALE,
        data: value,
    };
}

export function setScaleLength(length) {
    return {
        type: SET_SCALE_LENGTH,
        data: length,
    };
}

export function setMaxAnchorLineLength(length) {
    return {
        type: SET_MAX_ANCHOR_LINE_LENGTH,
        data: length,
    };
}

export function setClusterDifferentRoutePointsDistance(length) {
    return {
        type: SET_CLUSTER_DIFFERENT_ROUTE_POINTS_DISTANCE,
        data: length,
    };
}

export function setClusterSameRoutePointsDistance(length) {
    return {
        type: SET_CLUSTER_SAME_ROUTE_POINTS_DISTANCE,
        data: length,
    };
}

export function setPointMinDistanceFromTerminus(length) {
    return {
        type: SET_POINT_MIN_DISTANCE_FROM_TERMINUS,
        data: length,
    };
}
