export const SET_BUILD = "SET_BUILD";
export const SET_DATE = "SET_DATE";
export const SET_POSTER_NAME = "SET_POSTER_NAME";

export function setBuild(id) {
    return {
        type: SET_BUILD,
        data: id,
    };
}

export function setDate(date) {
    return {
        type: SET_DATE,
        data: date,
    };
}

export function setPosterName(name) {
    return {
        type: SET_POSTER_NAME,
        data: name,
    };
}
