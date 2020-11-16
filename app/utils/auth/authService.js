import regeneratorRuntime from "regenerator-runtime"; // eslint-disable-line

const RequestMethod = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

const Endpoint = {
    LOGIN: "/login",
    SESSION: "/session",
    LOGOUT: "/logout"
};

const BACKEND_API_URL =
    process.env.API_URL || "https://kartat.hsl.fi/routemap-api";

const sendRequest = async (method, requestBody) => {
    try {
        const response = await fetch(BACKEND_API_URL + Endpoint.LOGIN, {
            method,
            credentials: "include",
            body: JSON.stringify(requestBody),
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (e) {
        console.info(e);
        return {error: e};
    }
};

export const authorizeUsingCode = async (code) => {
    const requestBody = {code};
    return sendRequest(RequestMethod.POST, requestBody);
};

export const checkExistingSession = async () => {
    try {
        const response = await fetch(BACKEND_API_URL + Endpoint.SESSION, {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        return await response.json();
    } catch (e) {
        console.info(e);
        return {error: e};
    }
};

export const logout = async () => {
    try {
        const response = await fetch(BACKEND_API_URL + Endpoint.LOGOUT, {
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (e) {
        console.info(e);
        return {error: e};
    }
};
