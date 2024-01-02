export const UPDATE_VIEWPORT = "UPDATE_VIEWPORT";

export function updateViewport(viewport) {
    return {
        type: UPDATE_VIEWPORT,
        viewport
    };
}

export function updateSymbol(symbol, e) {
    const newSymbol = symbol
        .set("latitude", +e.lat.toFixed(6))
        .set("longitude", +e.lng.toFixed(6));

    return {
        type: "UPDATE_SYMBOL",
        symbol: newSymbol
    };
}

export function addSymbol(zone) {
    return {
        type: "ADD_SYMBOL",
        zone
    };
}
