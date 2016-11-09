import { UPDATE_VIEWPORT } from "../actions/viewport";
import { LOAD_STATE } from "../actions/fileOperations";

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
        case LOAD_STATE:
            return action.state.viewport;
        default:
            return state;
    }
}
