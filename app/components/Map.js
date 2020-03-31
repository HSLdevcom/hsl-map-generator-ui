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

const getZoneIcon = (zone) => {
    switch (zone) {
        case "A":
            return <AZone />;
        case "B":
            return <BZone />;
        case "C":
            return <CZone />;
        case "D":
            return <DZone />;
        default:
            return <div />;
    }
};

const MapComponent = ({
    viewport,
    updateViewport,
    style,
    mapWidth,
    mapHeight,
    zoneSymbols,
    updateSymbol,
    showZoneSymbols
}) => {
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
                                offsetLeft={-10}
                                offsetTop={-10}
                                onDrag={(e) => {
                                    updateSymbol(symbol, e);
                                }}>
                                <div>{getZoneIcon(symbol.get("zone"))}</div>
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
