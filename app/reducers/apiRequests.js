import { GENERATE_IMAGE_REQUEST, GENERATE_IMAGE_SUCCESS, GENERATE_IMAGE_ERROR } from "../actions/apiRequests";

const initialState = {
    isLoading: false,
};

export default function apiRequests(state = initialState, action) {
    switch (action.type) {
        case GENERATE_IMAGE_REQUEST:
            return {
                imagePromise: action.imagePromise,
                isLoading: true,
            };
        case GENERATE_IMAGE_SUCCESS: {
            const openRequests = state.requestCounter - 1;
            return {
                isLoading: openRequests > 0,
            };
        }
        case GENERATE_IMAGE_ERROR: {
            const openRequests = state.requestCounter - 1;
            return {
                isLoading: openRequests > 0,
            };
        }
        default:
            return state;
    }
}
