export const TOGGLE_LAYER = "TOGGLE_LAYER";
export const SET_LAYER = "SET_LAYER";

export const toggleLayer = (layer) => ({
    type: TOGGLE_LAYER,
    layer
});

export const setLayer = (layer, boolean) => ({
    type: SET_LAYER,
    layer,
    boolean
});
