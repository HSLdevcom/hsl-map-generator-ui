const API_URL = process.env.API_URL;

function getJson(path) {
    return fetch(`${API_URL}/${path}`);
}

function postJson(path, body) {
    const options = {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(body)
    };
    return fetch(`${API_URL}/${path}`, options);
}

function putJson(path, body) {
    const options = {method: "PUT", body: JSON.stringify(body)};
    return fetch(`${API_URL}/${path}`, options);
}

function deleteJson(path) {
    const options = {method: "DELETE"};
    return fetch(`${API_URL}/${path}`, options);
}

function getStops() {
    return getJson("stops");
}

function getBuilds() {
    return getJson("builds");
}

function getBuild({id}) {
    return getJson(`builds/${id}`);
}

function addBuild({title}) {
    return postJson("builds", {title});
}

function updateBuild({id, status}) {
    return putJson(`builds/${id}`, {status});
}

function removeBuild({id}) {
    return deleteJson(`builds/${id}`);
}

function addPosters({buildId, component, props}) {
    return postJson("posters", {buildId, props, component});
}

function removePoster(item) {
    return postJson("removePosters", {item});
}

function cancelPoster(item) {
    return postJson("cancelPoster", {item});
}

function downloadPoster({id}) {
    window.open(`${API_URL}/downloadPoster/${id}`, "_blank");
}

function downloadBuild({id}) {
    window.open(`${API_URL}/downloadBuild/${id}`, "_blank");
}

function getPointConfig() {
    return getJson("config");
}

function setPointConfig(targetDate) {
    return postJson(
        `import?targetDate=${encodeURIComponent(
            targetDate.format("YYYY-MM-DD")
        )}`
    );
}

export {
    getStops,
    getBuilds,
    getBuild,
    addBuild,
    updateBuild,
    removeBuild,
    cancelPoster,
    addPosters,
    removePoster,
    downloadPoster,
    downloadBuild,
    getPointConfig,
    setPointConfig
};
