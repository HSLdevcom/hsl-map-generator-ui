import PropTypes from "prop-types";
import React from "react";
import {Marker} from "react-map-gl";
import styles from "./Marker.css";

const CenterMarker = ({viewport, center, updateCenter}) => {
    const latitude = center.get(1);
    const longitude = center.get(0);

    return (
        <Marker
            {...viewport}
            draggable={true}
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-10}
            offsetTop={-10}
            onDrag={updateCenter}>
            <div className={styles.marker}>
                <div className={styles.markerDot} />
            </div>
        </Marker>
    );
};

CenterMarker.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default CenterMarker;
