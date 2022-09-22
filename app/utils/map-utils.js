import memoize from "memoizee";
import moment from "moment";
import hslMapStyle from "hsl-map-style";
import {
    mapSelectionToTileScale,
    mapSelectionToPixelSize,
    mapSelectionToZoom,
    mapSelectionToMeterPerPixelRatio
} from "./geom-utils";

// Override defaults of enabled layers from hsl-map-style
const overrideDefaults = {
    routes_with_departures_only: {enabled: false}
};

const components = hslMapStyle.components;
const sourcesWithDate = ["stops", "routes"];

export const layersFromStyle = () => {
    return components.map((component) => ({
        id: component.id,
        enabled: overrideDefaults[component.id]
            ? overrideDefaults[component.id].enabled
            : component.enabled,
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

const parseRouteFilterIds = (routeFilter, useJoreId) => {
    if (routeFilter && routeFilter.length >= 0) {
        if (!useJoreId) {
            const mappedFilter = routeFilter.map((filter) => {
                return {idParsed: filter};
            });
            return mappedFilter;
        }
        return routeFilter;
    }
    return [];
};

export const styleFromLayers = memoize(
    (layers, date, routeFilter, useJoreId) => {
        console.log(useJoreId);
        const style = hslMapStyle.generateStyle({
            components: mapLayers(layers),
            routeFilter: parseRouteFilterIds(routeFilter, useJoreId)
        });

        sourcesWithDate.forEach((key) => {
            if (style.sources[key] && style.sources[key].url) {
                style.sources[key].url += `?date=${date}`;
            }
        });

        return style;
    }
);

export const createMapOptions = (mapSelection) => {
    const tileScale = mapSelectionToTileScale(mapSelection);
    const mapOptions = {
        center: mapSelection.get("center").toArray(),
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

    if (mapSelection.zoneSymbols) {
        const symbolMap = {};
        mapSelection.zoneSymbols.forEach((symbol) => {
            const zone = symbol.get("zone");
            const lng = symbol.get("longitude");
            const lat = symbol.get("latitude");
            if (!symbolMap[zone]) {
                symbolMap[zone] = [[lng, lat]];
            } else {
                const symbols = symbolMap[zone];
                symbols.push([lng, lat]);
                symbolMap[zone] = symbols;
            }
        });
        mapOptions.zoneSymbols = symbolMap;
        mapOptions.zoneSymbolSize = mapSelection.zoneSymbolSize;
    }
    return mapOptions;
};

export const createConfigurationOptions = (configuration, pointConfig) => ({
    date: moment(pointConfig.target_date).format("YYYY-MM-DD"),
    name: configuration.get("posterName"),
    routeFilter: parseRouteFilterIds(
        configuration.get("routeFilter"),
        configuration.get("useJoreId")
    ),
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
    nearBuses: configuration.get("onlyNearBuses"),
    zoneSymbols: configuration.get("zoneSymbols"),
    symbolSize: configuration.get("symbolSize")
});

export const pointsWithinBbox = (points, bbox) => {
    const nw = bbox[0];
    const se = bbox[1];
    const pointsInBbox = [];
    points.forEach((symbol) => {
        const latitude = symbol.get("latitude");
        const longitude = symbol.get("longitude");
        if (
            latitude > nw[1] &&
            latitude < se[1] &&
            longitude > nw[0] &&
            longitude < se[0]
        ) {
            pointsInBbox.push(symbol);
        }
    });
    return pointsInBbox;
};
export const createRoutemapConfigurationOptions = (configuration) => ({
    posterName: configuration.get("posterName"),
    routeFilter: configuration.get("routeFilter"),
    scaleFontSize: configuration.get("scaleFontSize"),
    scaleLength: configuration.get("scaleLength"),
    maxAnchorLineLength: configuration.get("maxAnchorLineLength"),
    clusterDifferentRoutePointsDistance: configuration.get(
        "clusterDifferentRoutePointsDistance"
    ),
    clusterSameRoutePointsDistance: configuration.get(
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
    onlyNearBuses: configuration.get("onlyNearBuses"),
    zoneSymbols: configuration.get("zoneSymbols"),
    symbolSize: configuration.get("symbolSize")
});
