import { GENERATE_IMAGE_REQUEST, GENERATE_IMAGE_CANCEL_ALL, GENERATE_IMAGE_SUCCESS, GENERATE_IMAGE_ERROR } from "../actions/apiRequests";

const initialState = {
    isLoading: false,
    requestCounter: 0,
};

export default function apiRequests(state = initialState, action) {
    switch (action.type) {
        case GENERATE_IMAGE_REQUEST:
            return {
                requestCounter: state.requestCounter + 1,
                isLoading: true,
            };
        case GENERATE_IMAGE_SUCCESS: {
            const openRequests = state.requestCounter - 1;
            return {
                requestCounter: Math.max(openRequests, 0),
                isLoading: openRequests > 0,
            };
        }
        case GENERATE_IMAGE_ERROR: {
            const openRequests = state.requestCounter - 1;
            return {
                requestCounter: Math.max(openRequests, 0),
                isLoading: openRequests > 0,
            };
        }
        case GENERATE_IMAGE_CANCEL_ALL: {
            return {
                requestCounter: 0,
                isLoading: false,
            };
        }
        default:
            return state;
    }
}
