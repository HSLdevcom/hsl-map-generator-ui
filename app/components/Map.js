import PropTypes from "prop-types";
import React from "react";
import MapGL from "react-map-gl";
import CenterMarker from "../containers/CenterMarker";
import SelectionWindow from "../containers/SelectionWindow";
import DebugOverlay from "../containers/DebugOverlay";
import Spinner from "../containers/Spinner";

const MapComponent = ({
    viewport,
    updateViewport,
    style,
    mapWidth,
    mapHeight
}) => (
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
        </MapGL>
        <Spinner width={mapWidth} height={mapHeight} />
    </div>
);

MapComponent.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default MapComponent;
