import { TOGGLE_SAVE_WORLD_FILE } from "../actions/settings";

const initialState = {
    saveWorldFile: false,
};

export default function settings(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SAVE_WORLD_FILE:
            return {
                ...state,
                saveWorldFile: !state.saveWorldFile,
            };
        default:
            return state;
    }
}
