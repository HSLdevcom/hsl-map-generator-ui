import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import maplibregl from "maplibre-gl";
import AZone from "../icons/icon-Zone-A";
import BZone from "../icons/icon-Zone-B";
import CZone from "../icons/icon-Zone-C";
import DZone from "../icons/icon-Zone-D";
import {
    mapSelectionToBbox,
    bboxDiameterInMeters,
    mapSelectionToMeterPerPixelRatio
} from "../utils/geom-utils";

const getZoneIcon = (zone, svgSize) => {
    switch (zone) {
        case "A":
            return <AZone size={svgSize} />;
        case "B":
            return <BZone size={svgSize} />;
        case "C":
            return <CZone size={svgSize} />;
        case "D":
            return <DZone size={svgSize} />;
        default:
            return <div />;
    }
};

const getSymbolSize = (symbolSize, mapSelection, map) => {
    const matchValues = symbolSize.match(/\d+/);
    const symbolSizeNumber = matchValues ? parseInt(matchValues[0], 10) : null;

    // We know the symbol's size in pixels in the poster so we can calculate its diameter in meters
    const pixelToMeterRatio = mapSelectionToMeterPerPixelRatio(mapSelection);
    const symbolDiameterInMeters = symbolSizeNumber * pixelToMeterRatio;

    // We can calculate the ratio of the symbol's diameter to the mapSelection's diameter
    const mapSelectionBbox = mapSelectionToBbox(mapSelection);
    const bboxInMeters = bboxDiameterInMeters(mapSelectionBbox);
    const symbolToMapSelectionRatio = symbolDiameterInMeters / bboxInMeters;

    // Get mapSelection coordinates in pixel coordinates
    const bboxNw = map.project(mapSelectionBbox[0]);
    const bboxSe = map.project(mapSelectionBbox[1]);

    // Calculate mapSelection diameter in pixels
    const widthInPixels = Math.abs(bboxSe.x - bboxNw.x);
    const heightInPixels = Math.abs(bboxSe.y - bboxNw.y);
    const bboxDiameter = Math.sqrt(
        widthInPixels * widthInPixels + heightInPixels * heightInPixels
    );

    // Finally get the symbol's diameter in pixels relative to the map
    const symbolSizeToMapScale = bboxDiameter * symbolToMapSelectionRatio;

    return symbolSizeToMapScale;
};

const ZoneSymbolMarkers = ({
    map,
    zoneSymbols,
    updateSymbol,
    symbolSize,
    mapSelection
}) => {
    const markersRef = useRef([]);

    useEffect(() => {
        if (!map || !zoneSymbols) {
            return () => {};
        }

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        const svgSize = getSymbolSize(symbolSize, mapSelection, map);
        zoneSymbols.forEach((symbol) => {
            const markerElement = document.createElement("div");
            ReactDOM.render(
                getZoneIcon(symbol.get("zone"), svgSize),
                markerElement
            );

            const marker = new maplibregl.Marker({
                element: markerElement,
                draggable: true
            })
                .setLngLat([symbol.get("longitude"), symbol.get("latitude")])
                .addTo(map);

            marker.on("dragend", (e) => {
                const lngLat = e.target.getLngLat();
                updateSymbol(symbol, {lng: lngLat.lng, lat: lngLat.lat});
            });
            marker.symbol = symbol;
            markersRef.current.push(marker);
        });

        return () => markersRef.current.forEach((marker) => marker.remove());
    }, [map, zoneSymbols, updateSymbol, symbolSize]);

    useEffect(() => {
        if (!map) {
            return () => {};
        }

        const resizeMarkers = () => {
            const newSvgSize = getSymbolSize(symbolSize, mapSelection, map);
            markersRef.current.forEach((marker) => {
                const element = marker.getElement();
                if (marker.symbol) {
                    ReactDOM.render(
                        getZoneIcon(marker.symbol.get("zone"), newSvgSize),
                        element
                    );
                }
            });
        };

        map.on("zoomend", resizeMarkers);

        return () => map.off("zoomend", resizeMarkers);
    }, [symbolSize]);

    return null;
};

export default ZoneSymbolMarkers;
