const API_URL = "http://localhost:4002";

function getJson(path) {
    return fetch(`${API_URL}/${path}`);
}

function postJson(path, body) {
    const options = { method: "POST", body: JSON.stringify(body) };
    return fetch(`${API_URL}/${path}`, options);
}

function putJson(path, body) {
    const options = { method: "PUT", body: JSON.stringify(body) };
    return fetch(`${API_URL}/${path}`, options);
}

function deleteJson(path) {
    const options = { method: "DELETE" };
    return fetch(`${API_URL}/${path}`, options);
}

function getStops() {
    return getJson("stops");
}

function getBuilds() {
    return getJson("builds/ROUTEMAP");
}

function getBuild({ id }) {
    return getJson(`builds/ROUTEMAP/${id}`);
}

function addBuild({ title }) {
    return postJson("builds", { title, type: "ROUTEMAP" });
}

function updateBuild({ id, status }) {
    return putJson(`builds/${id}`, { status });
}

function removeBuild({ id }) {
    return deleteJson(`builds/${id}`);
}

function addPosters({ buildId, component, props }) {
    return postJson("posters", { buildId, props, component });
}

function removePoster({ id }) {
    return deleteJson(`posters/${id}`);
}

function downloadPoster({ id }) {
    window.open(`${API_URL}/downloadPoster/${id}`, "_blank");
}

function downloadBuild({ id }) {
    window.open(`${API_URL}/downloadBuild/${id}`, "_blank");
}

export {
    getStops,
    getBuilds,
    getBuild,
    addBuild,
    updateBuild,
    removeBuild,
    addPosters,
    removePoster,
    downloadPoster,
    downloadBuild,
};
