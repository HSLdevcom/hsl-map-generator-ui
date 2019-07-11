import {WINDOW_RESIZE} from "../actions/windowEvents";

const initialState = {
    mapWidth: window.innerWidth - 320,
    mapHeight: window.innerHeight - 60
};

export default function layout(state = initialState, action) {
    switch (action.type) {
        case WINDOW_RESIZE:
            return {
                mapWidth: window.innerWidth - 320,
                mapHeight: window.innerHeight - 60
            };
        default:
            return state;
    }
}
