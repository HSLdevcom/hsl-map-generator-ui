import {saveAs} from "file-saver";
import CancelablePromise from "cancelable-promise";
import moment from "moment";
import urljoin from "url-join";

import {styleFromLayers, createMapOptions} from "../utils/map-utils";

export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_ERROR = "GENERATE_IMAGE_ERROR";
export const GENERATE_IMAGE_CANCEL_ALL = "GENERATE_IMAGE_CANCEL_ALL";

let cancelablePromises = [];

export const generateImageCancelAll = () => (dispatch) => {
    cancelablePromises.forEach((promise) => promise.cancel());
    cancelablePromises = [];
    dispatch({type: GENERATE_IMAGE_CANCEL_ALL});
};

export const generateImage = () => (dispatch, getState) => {
    const state = getState();
    const style = styleFromLayers(state.layers, state.settings.date);

    const cancelablePromise = new CancelablePromise((resolve) => {
        resolve(
            fetch(urljoin(process.env.GENERATE_API_URL, "generateImage"), {
                method: "POST",
                mode: "cors",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({
                    options: createMapOptions(state.mapSelection),
                    style
                })
            })
        );
    });

    cancelablePromise
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response
                    .blob()
                    .then((blob) => {
                        const date = moment().format("YYYY-MM-DD-HH:mm:ss");
                        saveAs(blob, `map-${date}.png`);
                        if (state.settings.saveWorldFile) {
                            const worldFile = response.headers
                                .get("World-File")
                                .replace(/\|/g, "\n");
                            const worldFileBlob = new Blob([worldFile], {
                                type: "text/plain"
                            });
                            saveAs(worldFileBlob, `map-${date}.pgw`);
                        }
                    })
                    .then(() => {
                        cancelablePromises = cancelablePromises.filter(
                            (val) => val !== cancelablePromise
                        );
                        dispatch({type: GENERATE_IMAGE_SUCCESS});
                    });
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        })
        .catch((error) => {
            if (process.env.NODE_ENV === "development") console.error(error); // eslint-disable-line no-console
            cancelablePromises = cancelablePromises.filter(
                (val) => val !== cancelablePromise
            );
            dispatch({type: GENERATE_IMAGE_ERROR});
        });

    cancelablePromises = [...cancelablePromises, cancelablePromise];
    dispatch({type: GENERATE_IMAGE_REQUEST});
};
