import { fromJS, Iterable } from "immutable";
import { memoize } from "lodash";
import hslMapStyle from "hsl-map-style";

const components = hslMapStyle.components;

export const layersFromStyle = () => components.map(component => ({
    id: component.id,
    enabled: component.enabled,
    description: component.description,
    dependencies: component.dependencies,
}));

const mapLayers = (layers) => {
    const ret = {};
    layers.forEach((layer) => { ret[layer.id] = { enabled: layer.enabled }; });
    return ret;
};

export const styleFromLayers = memoize(layers =>
    fromJS(
        hslMapStyle.generateStyle({
            glyphsUrl: process.env.API_URL,
            components: mapLayers(layers),
        }),
        (key, value) => {
            const isIndexed = Iterable.isIndexed(value);
            return isIndexed ? value.toList() : value.toOrderedMap();
        },
    ));
