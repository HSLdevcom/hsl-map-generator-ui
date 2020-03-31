import {
    // getStops,
    getBuilds,
    getBuild,
    addBuild,
    // updateBuild,
    // removeBuild,
    addPosters,
    // removePoster,
    // downloadPoster,
    // downloadBuild
    getPointConfig,
    setPointConfig
} from "../utils/publisher-api";
import {
    createMapOptions,
    createConfigurationOptions,
    pointsWithinBbox
} from "../utils/map-utils";

import {mapSelectionToBbox} from "../utils/geom-utils";

export const GET_BUILDS_REQUEST = "GET_BUILDS_REQUEST";
export const GET_BUILDS_SUCCESS = "GET_BUILDS_SUCCESS";
export const GET_BUILDS_ERROR = "GET_BUILDS_ERROR";
export const GET_BUILD_REQUEST = "GET_BUILD_REQUEST";
export const GET_BUILD_SUCCESS = "GET_BUILD_SUCCESS";
export const GET_BUILD_ERROR = "GET_BUILD_ERROR";
export const ADD_BUILD_REQUEST = "ADD_BUILD_REQUEST";
export const ADD_BUILD_SUCCESS = "ADD_BUILD_SUCCESS";
export const ADD_BUILD_ERROR = "ADD_BUILD_ERROR";
export const ADD_BUILD_RESET = "ADD_BUILD_RESET";
export const GET_POINT_CONFIG = "GET_POINT_CONFIG";
export const GET_POINT_CONFIG_SUCCESS = "GET_POINT_CONFIG_SUCCESS";
export const GET_POINT_CONFIG_ERROR = "GET_POINT_CONFIG_ERROR";
export const SET_POINT_CONFIG = "SET_POINT_CONFIG";
export const SET_POINT_CONFIG_SUCCESS = "SET_POINT_CONFIG_SUCCESS";
export const SET_POINT_CONFIG_ERROR = "SET_POINT_CONFIG_ERROR";

const fetchDispatcher = ({action, onFetching, onSuccess, onError}) => {
    action.then((response) => {
        if (!response.ok) {
            return onError();
        }
        return response
            .json()
            .then((data) => onSuccess(data))
            .catch((err) => onError(err));
    });
    return onFetching();
};

export const getBuildsAction = () => (dispatch) => {
    fetchDispatcher({
        action: getBuilds(),
        onFetching: () => dispatch({type: GET_BUILDS_REQUEST}),
        onSuccess: (data) => dispatch({type: GET_BUILDS_SUCCESS, data}),
        onError: () => dispatch({type: GET_BUILDS_ERROR})
    });
};

export const generateRouteMapAction = (onSending, onSuccess, onError) => (
    dispatch,
    getState
) => {
    const state = getState();
    const {routeMapConfiguration, mapSelection, publisherRequests} = state;

    if (routeMapConfiguration.get("zoneSymbols")) {
        const bbox = mapSelectionToBbox(mapSelection);

        const symbolsInBbox = pointsWithinBbox(
            mapSelection.get("zoneSymbols"),
            bbox
        );
        mapSelection.zoneSymbols = symbolsInBbox;
        mapSelection.zoneSymbolSize = routeMapConfiguration.get("symbolSize");
    }
    const props = {
        mapOptions: createMapOptions(mapSelection),
        configuration: createConfigurationOptions(
            routeMapConfiguration,
            publisherRequests.pointConfig
        )
    };

    fetchDispatcher({
        action: addPosters({
            buildId: routeMapConfiguration.get("build").id,
            component: "RouteMap",
            props: [props]
        }),
        onFetching: () => onSending(),
        onSuccess: () => onSuccess(),
        onError: () => onError()
    });
};

export const fetchBuild = (id, suppressInfo = false) => (dispatch) => {
    fetchDispatcher({
        action: getBuild({id}),
        onFetching: () => !suppressInfo && dispatch({type: GET_BUILD_REQUEST}),
        onSuccess: (data) => dispatch({type: GET_BUILD_SUCCESS, data}),
        onError: () => !suppressInfo && dispatch({type: GET_BUILD_ERROR})
    });
};

export const addList = (title, successCallback) => (dispatch) => {
    fetchDispatcher({
        action: addBuild({title}),
        onFetching: () => dispatch({type: ADD_BUILD_REQUEST}),
        onSuccess: () => {
            dispatch({type: ADD_BUILD_SUCCESS});
            getBuildsAction()(dispatch);
            successCallback();
        },
        onError: (err) => dispatch({type: ADD_BUILD_ERROR, data: err})
    });
};

export const fetchConfig = (suppressInfo = false) => (dispatch) => {
    fetchDispatcher({
        action: getPointConfig(),
        onFetching: () => !suppressInfo && dispatch({type: GET_POINT_CONFIG}),
        onSuccess: (data) => dispatch({type: GET_POINT_CONFIG_SUCCESS, data}),
        onError: (err) =>
            !suppressInfo && dispatch({type: GET_POINT_CONFIG_ERROR, data: err})
    });
};

export const setConfig = (targetDate) => (dispatch) => {
    fetchDispatcher({
        action: setPointConfig(targetDate),
        onFetching: () => dispatch({type: SET_POINT_CONFIG}),
        onSuccess: (data) => dispatch({type: SET_POINT_CONFIG_SUCCESS, data}),
        onError: (err) => dispatch({type: SET_POINT_CONFIG_ERROR, data: err})
    });
};
