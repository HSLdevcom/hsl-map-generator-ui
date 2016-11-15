import React, { PropTypes } from "react";
import MapGL from "react-map-gl";
import CenterMarker from "../containers/CenterMarker";
import SelectionWindow from "../containers/SelectionWindow";
import DebugOverlay from "../containers/DebugOverlay";

const MapComponent = ({ viewport, updateViewport, style }) => (
    <div>
        <MapGL
            {...viewport}
            width={window.innerWidth - 320}
            height={window.innerHeight - 60}
            mapStyle={style}
            onChangeViewport={updateViewport}
        >
            <CenterMarker
                viewport={viewport}
                width={window.innerWidth - 320}
                height={window.innerHeight - 60}
            />
            <SelectionWindow
                viewport={viewport}
                width={window.innerWidth - 320}
                height={window.innerHeight - 60}
            />
            <DebugOverlay
                viewport={viewport}
                width={window.innerWidth - 320}
                height={window.innerHeight - 60}
            />
        </MapGL>
    </div>
);

MapComponent.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired,
    }).isRequired,
};

export default MapComponent;
