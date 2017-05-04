import update from "react/lib/update";
import { findIndex } from "lodash";
import { TOGGLE_LAYER } from "../actions/layers";
import { LOAD_STATE } from "../actions/fileOperations";
import { layersFromStyle } from "../utils/map-utils";

const initialState = layersFromStyle();

export default function layers(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LAYER: {
            const query = {};
            const index = findIndex(state, { id: action.layer });
            query[index] = { enabled: { $set: !state[index].enabled } };
            return update(state, query);
        }
        case LOAD_STATE:
            return action.state.layers;
        default:
            return state;
    }
}
