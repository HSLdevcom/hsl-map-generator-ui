export const SET_BUILD = "SET_BUILD";

export function setBuild(id) {
    return {
        type: SET_BUILD,
        data: id,
    };
}
