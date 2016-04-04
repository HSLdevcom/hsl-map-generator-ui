import { fromJS } from 'immutable';
import style from 'hsl-map-style/hsl-gl-map-with-stops-v8.json';

export const baseStyle = fromJS(style);

export const styleFromLayers = (layers) => baseStyle

// .set('layers', fromJS(
//   layers
//   .concat()
//   .reverse()
//   .filter(layer => layer.enabled)
//   .reduce((prev, layer) => prev.concat(style.groups[layer.id].layers), [])));

// TODO: This is horrible and should be replaced with a propurr implementation
