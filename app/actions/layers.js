export const SWITCH_LAYER = "SWITCH_LAYER";
export const TOGGLE_LAYER = "TOGGLE_LAYER";

export const toggleLayer = (layer) => ({
  type: TOGGLE_LAYER,
  layer
});

export const switchLayer = (oldLayer, newLayer) => ({
  type: SWITCH_LAYER,
  oldLayer,
  newLayer
});
