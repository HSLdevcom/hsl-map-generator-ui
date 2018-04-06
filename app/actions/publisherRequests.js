import {
  // getStops,
  getBuilds,
  // getBuild,
  // addBuild,
  // updateBuild,
  // removeBuild,
  // addPosters,
  // removePoster,
  // downloadPoster,
  // downloadBuild
} from "../utils/publisher-api";

export const GET_BUILDS_REQUEST = "GET_BUILDS_REQUEST";
export const GET_BUILDS_SUCCESS = "GET_BUILDS_SUCCESS";
export const GET_BUILDS_ERROR = "GET_BUILDS_ERROR";

export const getBuildsAction = () =>
    (dispatch) => {
        getBuilds().then((response) => {
            if (!response.ok) {
                dispatch({ type: GET_BUILDS_ERROR });
            } else {
                response.json()
                  .then(data => dispatch({ type: GET_BUILDS_SUCCESS, data }))
                  .catch(() => dispatch({ type: GET_BUILDS_ERROR }));
            }
        });
        dispatch({ type: GET_BUILDS_REQUEST });
    };

