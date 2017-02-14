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

export const styleFromLayers = (layers, sources) =>
    baseStyle.mergeIn(["sources"], sources).set("layers", baseStyle.get("layers").map((layer) => {
        let newLayer = layer;
        const layerState = find(layers, matchesProperty("id", newLayer.getIn(["metadata", "mapbox:group"])));

        if (!newLayer.get("ref") && layerState && !layerState.enabled) {
            return newLayer.setIn(["layout", "visibility"], "none");
        } else if (!newLayer.get("ref") && layerState && layerState.enabled === true) {
            newLayer = newLayer.setIn(["layout", "visibility"], "visible");
            if (layerState.source) {
                newLayer = newLayer.set("source", layerState.source);
            }
            if (layerState.filter) {
                if (newLayer.get("filter")) {
                    return newLayer.set("filter", fromJS(["all", newLayer.get("filter"), layerState.filter]));
                }
                return newLayer.set("filter", layerState.filter);
            }
            // TODO: Replace once hsl-map-style is updated, and request correct style from there
            if (noIconDisplayIds.includes(layerState.id)) {
                if (newLayer.getIn(["layout", "icon-image"])) newLayer = newLayer.deleteIn(["layout", "icon-image"]);
                if (newLayer.getIn(["layout", "text-offset"])) newLayer = newLayer.deleteIn(["layout", "text-offset"]);
            }
        }
        return newLayer;
    }));
