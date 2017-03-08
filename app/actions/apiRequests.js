import { saveAs } from "file-saver";
import CancelablePromise from "cancelable-promise";
import urljoin from "url-join";

import { styleFromLayers } from "../utils/map-utils";
import { mapSelectionToTileScale, mapSelectionToPixelSize, mapSelectionToZoom } from "../utils/geom-utils";

export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_ERROR = "GENERATE_IMAGE_ERROR";
export const GENERATE_IMAGE_CANCEL_ALL = " GENERATE_IMAGE_CANCEL_ALL";

const createMapOptions = (mapSelection) => {
    const tileScale = mapSelectionToTileScale(mapSelection);

    const glOptions = {
        center: mapSelection.getIn(["center", 0, "location"]).toArray(),
        width: Math.round(mapSelectionToPixelSize(mapSelection)[0] / tileScale),
        height: Math.round(mapSelectionToPixelSize(mapSelection)[1] / tileScale),
        zoom: mapSelectionToZoom(mapSelection) - 1,
        scale: tileScale,
        pitch: 0,
        bearing: 0,
    };

    return glOptions;
};

export const generateImageCancelAll = () =>
    (dispatch, getState) => {
        getState().apiRequests.imagePromises.forEach((promise) => {
            promise.cancel();
        });
        dispatch({ type: GENERATE_IMAGE_CANCEL_ALL });
    };

export const generateImage = () =>
    (dispatch, getState) => {
        const state = getState();

        const cancelablePromise = new CancelablePromise((resolve) => {
            resolve(fetch(urljoin(process.env.API_URL, "generateImage"), {
                method: "POST",
                mode: "cors",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({
                    options: createMapOptions(state.mapSelection),
                    style: styleFromLayers(state.layers).toJS(),
                }),
            }));
        });

        dispatch({ type: GENERATE_IMAGE_REQUEST, cancelablePromise });

        cancelablePromise.then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response.blob()
                    .then((blob) => {
                        const worldFile = response.headers.get("World-File").replace(/|/g, "\n");
                        const worldFileBlob = new Blob([worldFile], { type: "text/plain" });
                        saveAs(worldFileBlob, "map.pgw");
                        saveAs(blob, "map.png");
                    })
                    .then(() => {
                        dispatch({ type: GENERATE_IMAGE_SUCCESS });
                    });
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }).catch((error) => {
            if (process.env.NODE_ENV === "development") console.error(error); // eslint-disable-line no-console
            dispatch({ type: GENERATE_IMAGE_ERROR });
        });
    };
