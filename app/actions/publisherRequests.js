import {
  // getStops,
  getBuilds,
  // getBuild,
  // addBuild,
  // updateBuild,
  // removeBuild,
  addPosters,
  // removePoster,
  // downloadPoster,
  // downloadBuild
} from "../utils/publisher-api";
import { createMapOptions } from "../utils/map-utils";

export const GET_BUILDS_REQUEST = "GET_BUILDS_REQUEST";
export const GET_BUILDS_SUCCESS = "GET_BUILDS_SUCCESS";
export const GET_BUILDS_ERROR = "GET_BUILDS_ERROR";
export const GENERATE_ROUTEMAP_REQUEST = "GENERATE_ROUTEMAP_REQUEST";
export const GENERATE_ROUTEMAP_SUCCESS = "GENERATE_ROUTEMAP_SUCCESS";
export const GENERATE_ROUTEMAP_ERROR = "GENERATE_ROUTEMAP_ERROR";

const fetchDispatcher = ({ action, onFetching, onSuccess, onError }) => {
    action.then((response) => {
        if (!response.ok) {
            return onError();
        }
        return response.json()
            .then(data => onSuccess(data))
            .catch(() => onError());
    });
    return onFetching();
};

export const getBuildsAction = () =>
    (dispatch) => {
        fetchDispatcher({
            action: getBuilds(),
            onFetching: () => dispatch({ type: GET_BUILDS_REQUEST }),
            onSuccess: data => dispatch({ type: GET_BUILDS_SUCCESS, data }),
            onError: () => dispatch({ type: GET_BUILDS_ERROR }),
        });
    };

export const generateRouteMapAction = () =>
    (dispatch, getState) => {
        const state = getState();
        const { routeMapConfiguration, mapSelection } = state;
        const props = {
            mapOptions: createMapOptions(mapSelection),
            date: "2018-04-09",
        };

        fetchDispatcher({
            action: addPosters({
                buildId: routeMapConfiguration.get("buildId"),
                component: "RouteMap",
                props: [props],
            }),
            onFetching: () => dispatch({ type: GENERATE_ROUTEMAP_REQUEST }),
            onSuccess: data => dispatch({ type: GENERATE_ROUTEMAP_SUCCESS, data }),
            onError: () => dispatch({ type: GENERATE_ROUTEMAP_ERROR }),
        });
    };
