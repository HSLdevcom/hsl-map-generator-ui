import { SWITCH_LAYER, TOGGLE_LAYER } from '../actions/layers';
import update from 'react/lib/update';
import style from 'hsl-map-style/style-generator';
import { findIndex } from 'lodash';

const initialState = [];

Object.keys(style.groups).forEach(group => initialState[style.groups[group].index] = {
  id: group,
  enabled: style.groups[group].default,
  text: style.groups[group].description
});

initialState.reverse();

export default function layers(state = initialState, action) {
  switch (action.type) {
  case SWITCH_LAYER:
    return update(state, {
      $splice: [
        [action.oldLayer, 1],
        [action.newLayer, 0, state[action.oldLayer]]
      ]
    });
  case TOGGLE_LAYER:
    const query = {};
    const index = findIndex(state, {id: action.layer});
    query[index] = {enabled: {$set: !state[index].enabled}};
    return update(state, query);
  default:
    return state;
  }
}
