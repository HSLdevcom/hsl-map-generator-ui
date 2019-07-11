import {fromJS} from "immutable";
import {TOGGLE_MODE} from "../actions/modeSelection";
import Modes from "../enums/Modes";

const initialState = fromJS({
    mode: Modes.MAP
});

export default function modeSelection(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_MODE:
            return state.set(
                "mode",
                state.get("mode") === Modes.MAP ? Modes.ROUTEMAP : Modes.MAP
            );
        default:
            return state;
    }
}
