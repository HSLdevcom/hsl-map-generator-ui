import { fromJS, Iterable } from "immutable";
import memoize from "memoizee";
import moment from "moment";
import hslMapStyle from "hsl-map-style";
import {
    mapSelectionToTileScale,
    mapSelectionToPixelSize,
    mapSelectionToZoom,
    mapSelectionToMeterPerPixelRatio,
} from "./geom-utils";


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

export const createMapOptions = (mapSelection) => {
    const tileScale = mapSelectionToTileScale(mapSelection);

    return {
        center: mapSelection.getIn(["center", 0, "location"]).toArray(),
        width: Math.round(mapSelectionToPixelSize(mapSelection)[0] / tileScale),
        height: Math.round(mapSelectionToPixelSize(mapSelection)[1] / tileScale),
        zoom: mapSelectionToZoom(mapSelection) - 1,
        scale: tileScale,
        pitch: 0,
        bearing: 0,
        meterPerPxRatio: mapSelectionToMeterPerPixelRatio(mapSelection),
    };
};

export const createConfigurationOptions = (configuration, pointConfig) => ({
    date: moment(pointConfig.target_date).format("YYYY-MM-DD"),
    name: configuration.get("posterName"),
    scaleFontSize: configuration.get("scaleFontSize"),
    scaleLength: configuration.get("scaleLength"),
    maxAnchorLength: configuration.get("maxAnchorLineLength"),
    clusterDifferentPointsDistance: configuration.get("clusterDifferentRoutePointsDistance"),
    clusterSamePointsDistance: configuration.get("clusterSameRoutePointsDistance"),
    pointMinDistanceFromTerminus: configuration.get("pointMinDistanceFromTerminus"),
    intermediatePointFontSize: configuration.get("intermediatePointFontSize"),
    intermediatePointWidth: configuration.get("intermediatePointWidth"),
    terminusFontSize: configuration.get("terminusFontSize"),
    terminusWidth: configuration.get("terminusWidth"),
    stationFontSize: configuration.get("stationFontSize"),
    nearBuses: configuration.get("onlyNearBuses"),
});
