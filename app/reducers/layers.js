import { SWITCH_LAYER, TOGGLE_LAYER } from "../actions/layers";
import { LOAD_STATE } from "../actions/fileOperations";
import update from "react/lib/update";
import style from "hsl-map-style/hsl-gl-map-with-stops-v9.json";
import { findIndex } from "lodash";

const initialState = [];

Object.keys(style.metadata["mapbox:groups"]).forEach((group, index) => initialState[index] = {
    id: group,
    enabled: style.metadata["mapbox:groups"][group].default,
    text: style.metadata["mapbox:groups"][group].name,
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
            const index = findIndex(state, { id: action.layer });
            query[index] = { enabled: { $set: !state[index].enabled } };
            return update(state, query);
        case LOAD_STATE:
            return action.state.layers;
        default:
            return state;
    }
}
