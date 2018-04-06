import { fromJS } from "immutable";
import { SET_BUILD } from "../actions/routeMapConfiguration";

const initialState = fromJS({
    buildId: null,
});

export default function routeMapConfiguration(state = initialState, action) {
    switch (action.type) {
        case SET_BUILD:
            return state.set("buildId", action.data);
        default:
            return state;
    }
}
