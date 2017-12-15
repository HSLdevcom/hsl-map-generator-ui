import moment from "moment";
import { TOGGLE_SAVE_WORLD_FILE, CHANGE_DATE } from "../actions/settings";

const initialState = {
    saveWorldFile: false,
    date: moment().format("YYYY-MM-DD"),
};

export default function settings(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_SAVE_WORLD_FILE:
            return {
                ...state,
                saveWorldFile: !state.saveWorldFile,
            };
        case CHANGE_DATE:
            return {
                ...state,
                date: action.date,
            };
        default:
            return state;
    }
}
