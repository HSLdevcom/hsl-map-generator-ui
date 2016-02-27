import { UPDATE_VIEWPORT } from '../actions/viewport';

const initialState = {
  latitude: 60.2,
  longitude: 24.9,
  zoom: 10,
  startDragLngLat: null,
  isDragging: false
};

export default function viewport(state = initialState, action) {
  switch (action.type) {
  case UPDATE_VIEWPORT:
    return Object.assign({}, state, action.viewport);
  default:
    return state;
  }
}
