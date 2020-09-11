import PropTypes from "prop-types";
import React from "react";
import MapGL, {Marker} from "react-map-gl";
import CenterMarker from "../containers/CenterMarker";
import SelectionWindow from "../containers/SelectionWindow";
import DebugOverlay from "../containers/DebugOverlay";
import Spinner from "../containers/Spinner";

import AZone from "../icons/icon-Zone-A";
import BZone from "../icons/icon-Zone-B";
import CZone from "../icons/icon-Zone-C";
import DZone from "../icons/icon-Zone-D";

// Same scaling used in backend for sizing the posters.
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
    if (!mapSelectionSize) return 0;
    const symbolSizeNum = parseInt(symbolSize.replace("px", ""), 10);
    const mapSizeDiameter = (mapWidth + mapHeight) / 2;
    const symbolToMapRatio = mapSizeDiameter / symbolSizeNum;
    const mapSelectionSizeDiameter =
        (mapSelectionSize[0] + mapSelectionSize[1]) / 2;

    return (mapSelectionSizeDiameter / symbolToMapRatio) * SCALE;
};

const MapComponent = ({
    viewport,
    updateViewport,
    style,
    mapWidth,
    mapHeight,
    zoneSymbols,
    updateSymbol,
    showZoneSymbols,
    symbolSize,
    mapSelectionSize
}) => {
    const svgSize = getSymbolSize(
        symbolSize,
        mapWidth,
        mapHeight,
        mapSelectionSize
    );
    return (
        <div>
            <MapGL
                {...viewport}
                width={mapWidth}
                height={mapHeight}
                mapStyle={style}
                onViewportChange={updateViewport}>
                <SelectionWindow
                    viewport={viewport}
                    width={mapWidth}
                    height={mapHeight}
                />
                <DebugOverlay
                    viewport={viewport}
                    width={mapWidth}
                    height={mapHeight}
                />
                <CenterMarker
                    viewport={viewport}
                    width={mapWidth}
                    height={mapHeight}
                />
                {showZoneSymbols &&
                    zoneSymbols.map((symbol) => {
                        return (
                            <Marker
                                key={symbol.get("id")}
                                draggable={true}
                                latitude={symbol.get("latitude")}
                                longitude={symbol.get("longitude")}
                                onDrag={(e) => {
                                    updateSymbol(symbol, e);
                                }}>
                                <div>
                                    {getZoneIcon(symbol.get("zone"), svgSize)}
                                </div>
                            </Marker>
                        );
                    })}
            </MapGL>
            <Spinner width={mapWidth} height={mapHeight} />
        </div>
    );
};

MapComponent.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default MapComponent;
