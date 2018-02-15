import { fromJS, Iterable } from "immutable";
import memoize from "memoizee";
import hslMapStyle from "hsl-map-style";

const components = hslMapStyle.components;
const sourcesWithDate = ["stops", "routes"];

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

export const styleFromLayers = memoize((layers, date) => {
    const style = hslMapStyle.generateStyle({
        glyphsUrl: process.env.GLYPH_URL,
        components: mapLayers(layers),
    });
    sourcesWithDate.forEach((key) => {
        if (style.sources[key] && style.sources[key].url) {
            style.sources[key].url += `?date=${date}`;
        }
    });
    return fromJS(
        style,
        (key, value) => {
            const isIndexed = Iterable.isIndexed(value);
            return isIndexed ? value.toList() : value.toOrderedMap();
        },
    );
});
