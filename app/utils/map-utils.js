import { fromJS, Iterable } from "immutable";
import { find, matchesProperty } from "lodash";
import style from "hsl-map-style/hsl-gl-map-with-stops-v9.json";

export const baseStyle = fromJS(style, (key, value) => {
    const isIndexed = Iterable.isIndexed(value);
    return isIndexed ? value.toList() : value.toOrderedMap();
});

export const styleFromLayers = (layers, sources) => {
    return baseStyle.mergeIn(["sources"], sources).set("layers", baseStyle.get("layers").map((layer) => {
        let newLayer = layer;
        const layerState = find(layers, matchesProperty("id", newLayer.getIn(["metadata", "mapbox:group"])));

        if (!newLayer.get("ref") && layerState && layerState.enabled === false) {
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
        }
        return newLayer;
    }));
};

// .set("layers", fromJS(
//     layers
//     .concat()
//     .reverse()
//     .filter(layer => layer.enabled)
//     .reduce((prev, layer) => prev.concat(style.groups[layer.id].layers), [])));

// TODO: This is horrible and should be replaced with a propurr implementation
