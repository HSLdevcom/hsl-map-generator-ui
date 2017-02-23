import { fromJS, Iterable } from "immutable";
import { find, matchesProperty } from "lodash";
import hslMapStyle from "hsl-map-style";

const noIconDisplayIds = ["1457010362398.355", "1452776685487.2012"];

const style = hslMapStyle.generateStyle({
    lang: ["fi", "sv"],
    extensions: ["icons", "stops"],
    glyphsUrl: process.env.API_URL,
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
        let newLayer = layer;
        const layerState = find(layers, matchesProperty("id", newLayer.getIn(["metadata", "mapbox:group"])));

        if (layerState && !layerState.enabled) return null;

        if (layerState && layerState.enabled && noIconDisplayIds.includes(layerState.id)) {
            // TODO: Replace once hsl-map-style is updated, and request correct style from there
            if (newLayer.getIn(["layout", "icon-image"])) newLayer = newLayer.deleteIn(["layout", "icon-image"]);
            if (newLayer.getIn(["layout", "text-offset"])) newLayer = newLayer.deleteIn(["layout", "text-offset"]);
        }
        return newLayer;
    })
    .filter(layer => !!layer));
