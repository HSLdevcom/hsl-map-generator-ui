export const UPDATE_VIEWPORT = "UPDATE_VIEWPORT";

export function updateViewport(viewport) {
    return {
        type: UPDATE_VIEWPORT,
        viewport
    };
}

export function updateSymbol(symbol, e) {
    const newSymbol = symbol;
    newSymbol._root.entries[0] = ["latitude", +e.lngLat[1].toFixed(6)];
    newSymbol._root.entries[1] = ["longitude", +e.lngLat[0].toFixed(6)];
    return {
        type: "UPDATE_SYMBOL",
        symbol
    };
}

export function addSymbol(zone) {
    return {
        type: "ADD_SYMBOL",
        zone
    };
}
