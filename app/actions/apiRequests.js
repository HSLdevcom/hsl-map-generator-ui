export const GENERATE_IMAGE_REQUEST = "GENERATE_IMAGE_REQUEST";
export const GENERATE_IMAGE_SUCCESS = "GENERATE_IMAGE_SUCCESS";
export const GENERATE_IMAGE_ERROR = "GENERATE_IMAGE_ERROR";

export const generateImageRequest = imagePromise => ({
    type: GENERATE_IMAGE_REQUEST,
    imagePromise,
});

export const generateImageSuccess = () => ({
    type: GENERATE_IMAGE_SUCCESS,
});

export const generateImageError = () => ({
    type: GENERATE_IMAGE_ERROR,
});
