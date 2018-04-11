import { fromJS } from "immutable";
import { SET_BUILD, SET_DATE } from "../actions/routeMapConfiguration";

const initialState = fromJS({
    build: null,
    date: new Date(),
});

export default function routeMapConfiguration(state = initialState, action) {
    switch (action.type) {
        case SET_BUILD:
            return state.set("build", action.data);
        case SET_DATE:
            return state.set("date", action.data);
        default:
            return state;
    }
}
