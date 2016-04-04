import { UPDATE_CENTER, UPDATE_SIZE, UPDATE_DPI, UPDATE_MAP_SCALE, UPDATE_PIXEL_SCALE } from '../actions/mapSelection';
import { LOAD_STATE } from '../actions/FileOperations';
import { fromJS } from 'immutable';

const initialState = fromJS({
  center: [{location: [24.9, 60.2], id: 0}],
  size: [300, 300],
  dpi: 300,
  mapScale: 10000,
  pixelScale: 1,
});

export default function mapSelection(state = initialState, action) {
  switch (action.type) {
  case UPDATE_CENTER:
    return state.setIn(['center', 0, 'location'], fromJS(action.center.location));
  case UPDATE_SIZE:
    return state.set('size', fromJS(action.size));
  case UPDATE_DPI:
    return state.set('dpi', action.dpi);
  case UPDATE_MAP_SCALE:
    return state.set('mapScale', action.mapScale);
  case UPDATE_PIXEL_SCALE:
    return state.set('pixelScale', action.pixelScale);
  case LOAD_STATE:
    return action.state.mapSelection;
  default:
    return state;
  }
}
