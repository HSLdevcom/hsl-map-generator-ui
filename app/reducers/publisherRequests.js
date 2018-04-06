import {
    GET_BUILDS_REQUEST,
    GET_BUILDS_SUCCESS,
    GET_BUILDS_ERROR,
} from "../actions/publisherRequests";

const initialState = {
    buildsAreLoading: false,
    buildIsInitialized: false,
    builds: [],
};

export default function publisherRequests(state = initialState, action) {
    switch (action.type) {
        case GET_BUILDS_REQUEST: {
            return {
                ...state,
                buildsAreLoading: true,
                buildIsInitialized: true,
                builds: [],
            };
        }
        case GET_BUILDS_SUCCESS: {
            return {
                ...state,
                buildsAreLoading: false,
                builds: action.data,
            };
        }
        case GET_BUILDS_ERROR: {
            return {
                ...state,
                buildsAreLoading: false,
                builds: [],
            };
        }
        default: {
            return state;
        }
    }
}
