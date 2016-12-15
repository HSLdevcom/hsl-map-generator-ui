import { GENERATE_IMAGE_REQUEST, GENERATE_IMAGE_CANCEL, GENERATE_IMAGE_SUCCESS, GENERATE_IMAGE_ERROR } from "../actions/apiRequests";

const initialState = {
    isLoading: false,
    requestCounter: 0,
    imagePromises: [],
};

export default function apiRequests(state = initialState, action) {
    switch (action.type) {
        case GENERATE_IMAGE_REQUEST:
            return {
                imagePromises: [...state.imagePromises, action.cancelablePromise],
                requestCounter: state.requestCounter + 1,
                isLoading: true,
            };
        case GENERATE_IMAGE_SUCCESS: {
            const openRequests = state.requestCounter - 1;
            return {
                imagePromises: state.imagePromises,
                requestCounter: Math.max(openRequests, 0),
                isLoading: openRequests > 0,
            };
        }
        case GENERATE_IMAGE_ERROR: {
            const openRequests = state.requestCounter - 1;
            return {
                imagePromises: state.imagePromises,
                requestCounter: Math.max(openRequests, 0),
                isLoading: openRequests > 0,
            };
        }
        case GENERATE_IMAGE_CANCEL: {
            return {
                imagePromises: [],
                requestCounter: 0,
                isLoading: false,
            };
        }
        default:
            return state;
    }
}
