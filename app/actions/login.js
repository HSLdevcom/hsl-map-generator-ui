export const SET_USER = "SET_USER";

export function login() {
    return {
        type: "LOGIN",
        data: "login"
    };
}

export function logout() {
    return {
        type: "LOGOUT",
        data: "logout"
    };
}

export const setUser = (user) => (dispatch) => {
    dispatch({type: SET_USER, user});
};
