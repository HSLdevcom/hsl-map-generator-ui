import { fromJS } from "immutable";
import moment from "moment";
import { SET_BUILD, SET_DATE, SET_POSTER_NAME } from "../actions/routeMapConfiguration";

const initialState = fromJS({
    build: null,
    date: moment().format("YYYY-MM-DD"),
    posterName: "",
});

export default function routeMapConfiguration(state = initialState, action) {
    switch (action.type) {
        case SET_BUILD:
            return state.set("build", action.data);
        case SET_DATE:
            return state.set("date", action.data);
        case SET_POSTER_NAME:
            return state.set("posterName", action.data);
        default:
            return state;
    }
}
