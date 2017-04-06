import { fromJS, Iterable } from "immutable";
import { find, matchesProperty } from "lodash";
import hslMapStyle from "hsl-map-style";

const style = hslMapStyle.generateStyle({
    lang: ["fi", "sv"],
    glyphsUrl: process.env.API_URL,
    extensions: ["icons", "stops", "routes", "citybikes", "driver_instructions"],
});

export const baseStyle = fromJS(style, (key, value) => {
    const isIndexed = Iterable.isIndexed(value);
    return isIndexed ? value.toList() : value.toOrderedMap();
});

export const layersFromStyle = () => {
    const layers = [];
    Object.keys(style.metadata["mapbox:groups"]).forEach((group, index) => {
        layers[index] = {
            id: group,
            enabled: style.metadata["mapbox:groups"][group].default,
            text: style.metadata["mapbox:groups"][group].name,
        };
    });
    layers.reverse();
    return layers;
};

export const styleFromLayers = layers =>
    baseStyle.set("layers", baseStyle.get("layers").map((layer) => {
        const layerState = find(layers, matchesProperty("id", layer.getIn(["metadata", "mapbox:group"])));
        if (layerState && !layerState.enabled) return null;
        return layer;
    })
    .filter(layer => !!layer));
