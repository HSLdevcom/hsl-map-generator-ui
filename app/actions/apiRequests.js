import { toJSON } from "transit-immutable-js";
import { saveAs } from "file-saver";
import CancelablePromise from "cancelable-promise";
import { styleFromLayers } from "../utils/map-utils";

export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_ERROR = "GENERATE_IMAGE_ERROR";
export const GENERATE_IMAGE_CANCEL = " GENERATE_IMAGE_CANCEL";

export const generateImageRequest = imagePromise => ({
    type: GENERATE_IMAGE_REQUEST,
    imagePromise,
});

export const generateImageSuccess = () => ({
    type: GENERATE_IMAGE_SUCCESS,
});

export const generateImageError = () => ({
    type: GENERATE_IMAGE_ERROR,
});

export const generateImageCancel = () => ({
    type: GENERATE_IMAGE_CANCEL,
});

export const generateImage = (state, imageRequest, imageSuccess, imageError) => {
    const cancelablePromise = new CancelablePromise((resolve) => {
        resolve(fetch(`${process.env.API_URL}/generateImage`, {
            method: "POST",
            mode: "cors",
            redirect: "follow",
            headers: new Headers({
                "Content-Type": "application/json",
                backend: "mapgenerator",
            }),
            body: JSON.stringify({
                mapSelection: toJSON(state.mapSelection),
                style: styleFromLayers(state.layers).toJS(),
            }),
        }));
    });

    imageRequest(cancelablePromise);

    cancelablePromise.then((response) => {
        if (response.status >= 200 && response.status < 300) {
            return response.blob().then(blob => saveAs(blob, "map.png")).then(imageSuccess());
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    })
    .catch((error) => {
        console.log("Request failed ", error);
        imageError();
    });

    return cancelablePromise;
};
