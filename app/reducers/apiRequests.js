import { GENERATE_IMAGE_REQUEST, GENERATE_IMAGE_SUCCESS, GENERATE_IMAGE_ERROR, GENERATE_IMAGE_CANCEL } from "../actions/apiRequests";

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
        case GENERATE_IMAGE_SUCCESS:
            return {
                isLoading: false,
            };
        case GENERATE_IMAGE_ERROR:
            return {
                isLoading: false,
            };
        case GENERATE_IMAGE_CANCEL:
            return {
                isLoading: false,
            };
        default:
            return state;
    }
}
