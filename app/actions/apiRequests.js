import { toJSON } from "transit-immutable-js";
import { saveAs } from "file-saver";
import CancelablePromise from "cancelable-promise";
import { styleFromLayers } from "../utils/map-utils";

export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_ERROR = "GENERATE_IMAGE_ERROR";
export const GENERATE_IMAGE_CANCEL = " GENERATE_IMAGE_CANCEL";

export const generateImageCancel = () =>
    (dispatch, getState) => {
        getState().apiRequests.imagePromise.cancel();
        dispatch({ type: GENERATE_IMAGE_CANCEL });
    };

export const generateImage = () =>
    (dispatch, getState) => {
        const state = getState();
        const cancelablePromise = new CancelablePromise((resolve) => {
            resolve(fetch(`${process.env.API_URL}/generateImage`, {
                method: "POST",
                mode: "cors",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    mapSelection: toJSON(state.mapSelection),
                    style: styleFromLayers(state.layers).toJS(),
                }),
            }));
        });

        dispatch({ type: GENERATE_IMAGE_REQUEST, cancelablePromise });

        cancelablePromise.then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.blob().then(blob => saveAs(blob, "map.png")).then(
                    dispatch({ type: GENERATE_IMAGE_SUCCESS }),
                );
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        })
        .catch((error) => {
            console.log("Request failed ", error);
            dispatch({ type: GENERATE_IMAGE_ERROR });
        });
    };
