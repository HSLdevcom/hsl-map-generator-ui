import {
    GET_BUILDS_REQUEST,
    GET_BUILDS_SUCCESS,
    GET_BUILDS_ERROR,
    GET_BUILD_REQUEST,
    GET_BUILD_SUCCESS,
    GET_BUILD_ERROR,
} from "../actions/publisherRequests";

const initialState = {
    buildsAreLoading: false,
    buildsAreInitialized: false,
    builds: [],
    buildsError: false,
    buildDataIsLoading: false,
    buildData: null,
    buildDataError: false,
};

export default function publisherRequests(state = initialState, action) {
    switch (action.type) {
        case GET_BUILDS_REQUEST: {
            return {
                ...state,
                buildsAreLoading: true,
                buildsAreInitialized: true,
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
        case GET_BUILD_REQUEST: {
            return {
                ...state,
                buildDataIsLoading: true,
                buildData: null,
                buildDataError: false,
            };
        }
        case GET_BUILD_SUCCESS: {
            return {
                ...state,
                buildDataIsLoading: false,
                buildData: action.data,
                buildDataError: false,
            };
        }
        case GET_BUILD_ERROR: {
            return {
                ...state,
                buildDataIsLoading: false,
                buildData: null,
                buildDataError: true,
            };
        }
        default: {
            return state;
        }
    }
}
