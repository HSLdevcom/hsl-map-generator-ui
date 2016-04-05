import { fromJS, Iterable } from 'immutable';
import { find, matchesProperty } from 'lodash';
import style from 'hsl-map-style/hsl-gl-map-with-stops-v8.json';

export const baseStyle = fromJS(style, (key, value) => {
  var isIndexed = Iterable.isIndexed(value);
  return isIndexed ? value.toList() : value.toOrderedMap();
});

export const styleFromLayers = (layers) => {
  return baseStyle.set('layers', baseStyle.get('layers').map((layer) => {
    const layerState = find(layers, matchesProperty('id', layer.getIn(['metadata', 'mapbox:group'])));
    if ( !layer.get('ref') && layerState && layerState.enabled === false) {
      return layer.setIn(['layout', 'visibility'], 'none');
    }
    return layer;
  }));
};

// .set('layers', fromJS(
//   layers
//   .concat()
//   .reverse()
//   .filter(layer => layer.enabled)
//   .reduce((prev, layer) => prev.concat(style.groups[layer.id].layers), [])));

// TODO: This is horrible and should be replaced with a propurr implementation
