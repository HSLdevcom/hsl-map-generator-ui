import {
    GET_BUILDS_REQUEST,
    GET_BUILDS_SUCCESS,
    GET_BUILDS_ERROR,
    GET_BUILD_REQUEST,
    GET_BUILD_SUCCESS,
    GET_BUILD_ERROR,
    ADD_BUILD_REQUEST,
    ADD_BUILD_SUCCESS,
    ADD_BUILD_ERROR,
    REMOVE_BUILD_SUCCESS,
    REMOVE_BUILD_ERROR,
    GET_POINT_CONFIG,
    GET_POINT_CONFIG_ERROR,
    GET_POINT_CONFIG_SUCCESS,
    SET_POINT_CONFIG,
    SET_POINT_CONFIG_ERROR,
    SET_POINT_CONFIG_SUCCESS
} from "../actions/publisherRequests";

const initialState = {
    buildsAreLoading: false,
    buildsAreInitialized: false,
    builds: [],
    buildsError: false,
    buildDataIsLoading: false,
    buildData: null,
    buildDataError: false,
    addBuildIsLoading: false,
    addBuildErrorMessage: "",
    deleteBuildErrorMessage: "",
    pointConfigLoading: false,
    pointConfig: null,
    pointConfigErrorMessage: ""
};

export const PointStatus = Object.freeze({
    PENDING: "PENDING",
    DONE: "READY",
    EMPTY: "EMPTY"
});

export default function publisherRequests(state = initialState, action) {
    switch (action.type) {
        case GET_BUILDS_REQUEST: {
            return {
                ...state,
                buildsAreLoading: true,
                buildsAreInitialized: true,
                builds: []
            };
        }
        case GET_BUILDS_SUCCESS: {
            return {
                ...state,
                buildsAreLoading: false,
                builds: action.data
            };
        }
        case GET_BUILDS_ERROR: {
            return {
                ...state,
                buildsAreLoading: false,
                builds: []
            };
        }
        case GET_BUILD_REQUEST: {
            return {
                ...state,
                buildDataIsLoading: true,
                buildData: null,
                buildDataError: false
            };
        }
        case GET_BUILD_SUCCESS: {
            return {
                ...state,
                buildDataIsLoading: false,
                buildData: action.data,
                buildDataError: false
            };
        }
        case GET_BUILD_ERROR: {
            return {
                ...state,
                buildDataIsLoading: false,
                buildData: null,
                buildDataError: true
            };
        }
        case ADD_BUILD_REQUEST: {
            return {
                ...state,
                addBuildIsLoading: true,
                addBuildErrorMessage: ""
            };
        }
        case ADD_BUILD_SUCCESS: {
            return {
                ...state,
                addBuildIsLoading: false,
                addBuildErrorMessage: ""
            };
        }
        case ADD_BUILD_ERROR: {
            return {
                ...state,
                addBuildIsLoading: false,
                addBuildErrorMessage: action.data
            };
        }
        case REMOVE_BUILD_SUCCESS: {
            return {
                ...state,
                addBuildErrorMessage: ""
            };
        }
        case REMOVE_BUILD_ERROR: {
            return {
                ...state,
                deleteBuildErrorMessage: action.data
            };
        }
        case GET_POINT_CONFIG: {
            return {
                ...state,
                pointConfigLoading: true,
                pointConfig: null,
                pointConfigErrorMessage: ""
            };
        }
        case GET_POINT_CONFIG_SUCCESS: {
            return {
                ...state,
                pointConfigLoading: false,
                pointConfig: action.data,
                pointConfigErrorMessage: ""
            };
        }
        case GET_POINT_CONFIG_ERROR: {
            return {
                ...state,
                pointConfigLoading: false,
                pointConfig: null,
                pointConfigErrorMessage: action.data
            };
        }
        case SET_POINT_CONFIG: {
            return {
                ...state,
                pointConfigLoading: true,
                pointConfig: null,
                pointConfigErrorMessage: ""
            };
        }
        case SET_POINT_CONFIG_SUCCESS: {
            return {
                ...state,
                pointConfigLoading: false,
                pointConfig: action.data,
                pointConfigErrorMessage: ""
            };
        }
        case SET_POINT_CONFIG_ERROR: {
            return {
                ...state,
                pointConfigLoading: false,
                pointConfig: null,
                pointConfigErrorMessage: action.data
            };
        }
        default: {
            return state;
        }
    }
}
