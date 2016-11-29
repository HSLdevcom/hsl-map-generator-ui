import { toJSON } from "transit-immutable-js";
import { styleFromLayers } from "hsl-map-generator-utils";
import { saveAs } from "file-saver";

export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_ERROR = "GENERATE_IMAGE_ERROR";

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

export const generateImage = state =>
    fetch("http://localhost:8000/generateImage", {
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
    })
    .then(response => response.blob())
    .then(blob => saveAs(blob, "map.png"));

export const generateStopLabels = state =>
    fetch("http://localhost:8000/generateStopLabels", {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: new Headers({
            "Content-Type": "application/json",
            backend: "mapgenerator",
        }),
        body: JSON.stringify({
            mapSelection: toJSON(state.mapSelection),
        }),
    })
    .then(response => response.blob())
    .then(blob => saveAs(blob, "stops.html"));
