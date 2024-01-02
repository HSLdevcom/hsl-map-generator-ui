import React, {useEffect, useRef} from "react";
import ReactDOM from "react-dom";
import maplibregl from "maplibre-gl";
import AZone from "../icons/icon-Zone-A";
import BZone from "../icons/icon-Zone-B";
import CZone from "../icons/icon-Zone-C";
import DZone from "../icons/icon-Zone-D";

const SCALE = 96 / 72;

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

const getSymbolSize = (symbolSize, mapWidth, mapHeight, mapSelectionSize) => {
    const size = mapSelectionSize.get("size");
    const symbolSizeNum = parseInt(symbolSize.replace("px", ""), 10);
    const mapSizeDiameter = (mapWidth + mapHeight) / 2;
    const symbolToMapRatio = mapSizeDiameter / symbolSizeNum;
    const mapSelectionSizeDiameter = (size.get(0) + size.get(0)) / 2;

    return (mapSelectionSizeDiameter / symbolToMapRatio) * SCALE;
};

const ZoneSymbolMarkers = ({
    map,
    zoneSymbols,
    updateSymbol,
    symbolSize,
    mapWidth,
    mapHeight,
    mapSelectionSize
}) => {
    const markersRef = useRef([]);

    useEffect(() => {
        if (!map || !zoneSymbols) return;

        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        const svgSize = getSymbolSize(
            symbolSize,
            mapWidth,
            mapHeight,
            mapSelectionSize
        );
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
        if (!map) return;

        const resizeMarkers = () => {
            const newSvgSize = getSymbolSize(
                symbolSize,
                mapWidth,
                mapHeight,
                mapSelectionSize
            );
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
    }, [mapSelectionSize]);

    return null;
};

export default ZoneSymbolMarkers;
