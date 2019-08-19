import {fromJS, Iterable} from "immutable";
import memoize from "memoizee";
import moment from "moment";
import hslMapStyle from "hsl-map-style";
import {
    mapSelectionToTileScale,
    mapSelectionToPixelSize,
    mapSelectionToZoom,
    mapSelectionToMeterPerPixelRatio
} from "./geom-utils";
import {mapValues} from "lodash";

const components = hslMapStyle.components;

export const layersFromStyle = () => {
    return components.map((component) => ({
        id: component.id,
        enabled: component.enabled,
        description: component.description,
        dependencies: component.dependencies
    }));
};

const mapLayers = (layers) => {
    const ret = {};
    layers.forEach((layer) => {
        ret[layer.id] = {enabled: layer.enabled};
    });
    return ret;
};

export const styleFromLayers = (layers, date) => {
    const style = hslMapStyle.generateStyle({
        glyphsUrl: process.env.GLYPH_URL,
        components: layers
    });

    style.sources = mapValues(style.sources, (value) => {
        // eslint-disable-next-line no-param-reassign
        value.url += `?date=${date}`;
        return value;
    });

    return style;
};

export const createMapOptions = (mapSelection) => {
    const tileScale = mapSelectionToTileScale(mapSelection);

    return {
        center: mapSelection.getIn(["center", 0, "location"]).toArray(),
        width: Math.round(mapSelectionToPixelSize(mapSelection)[0] / tileScale),
        height: Math.round(
            mapSelectionToPixelSize(mapSelection)[1] / tileScale
        ),
        zoom: mapSelectionToZoom(mapSelection) - 1,
        scale: tileScale,
        pitch: 0,
        bearing: 0,
        meterPerPxRatio: mapSelectionToMeterPerPixelRatio(mapSelection)
    };
};

export const createConfigurationOptions = (configuration, pointConfig) => ({
    date: moment(pointConfig.target_date).format("YYYY-MM-DD"),
    name: configuration.get("posterName"),
    scaleFontSize: configuration.get("scaleFontSize"),
    scaleLength: configuration.get("scaleLength"),
    maxAnchorLength: configuration.get("maxAnchorLineLength"),
    clusterDifferentPointsDistance: configuration.get(
        "clusterDifferentRoutePointsDistance"
    ),
    clusterSamePointsDistance: configuration.get(
        "clusterSameRoutePointsDistance"
    ),
    pointMinDistanceFromTerminus: configuration.get(
        "pointMinDistanceFromTerminus"
    ),
    intermediatePointFontSize: configuration.get("intermediatePointFontSize"),
    intermediatePointWidth: configuration.get("intermediatePointWidth"),
    terminusFontSize: configuration.get("terminusFontSize"),
    terminusWidth: configuration.get("terminusWidth"),
    stationFontSize: configuration.get("stationFontSize"),
    nearBuses: configuration.get("onlyNearBuses")
});
