import {fromJSON} from "transit-immutable-js";

export const LOAD_STATE = "LOAD_STATE";

export const loadState = (event) => (dispatch) => {
    const reader = new FileReader();
    reader.onload = (progress) =>
        dispatch({
            type: LOAD_STATE,
            state: fromJSON(progress.target.result)
        });
    reader.readAsText(event.target.files[0]);
};
