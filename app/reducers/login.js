import {SET_USER} from "../actions/login";

const initialState = {
    user: null
};

export default function login(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.data.user
            };
        case SET_USER:
            return {
                user: action.user
            };
        default:
            return state;
    }
}
