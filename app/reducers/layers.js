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
            const indexToToggle = findIndex(state, { id: action.layer });
            const layerToToggle = state[indexToToggle];

            query[indexToToggle] = { enabled: { $set: !layerToToggle.enabled } };

            if (!layerToToggle.enabled && layerToToggle.dependencies) {
                layerToToggle.dependencies.forEach((id) => {
                    const index = findIndex(state, { id });
                    query[index] = { enabled: { $set: true } };
                });
            }
            if (layerToToggle.enabled) {
                state.forEach((layer, index) => {
                    if (!layer.enabled || !layer.dependencies) return;
                    if (layer.dependencies.some(id => id === layerToToggle.id)) {
                        query[index] = { enabled: { $set: false } };
                    }
                });
            }
            return update(state, query);
        }
        case LOAD_STATE: {
            if (action.state.version < 3) {
                return state;
            }
            return state.map((layer) => {
                const layerToLoad = action.state.layers.find(({ id }) => id === layer.id);
                return { ...layer, enabled: !!layerToLoad && layerToLoad.enabled };
            });
        }
        default:
            return state;
    }
}
