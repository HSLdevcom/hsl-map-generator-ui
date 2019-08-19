import React, {PropTypes} from "react";
import {Marker} from "react-map-gl";

const CenterMarker = ({viewport, width, height, center, updateCenter}) => (
    <Marker
        {...viewport}
        width={width}
        height={height}
        points={center}
        onUpdatePoint={updateCenter}
        renderPoint={(point) => (
            <g>
                <circle
                    key={`${point.id}inner`}
                    r="4"
                    style={{fill: "#D91153"}}
                />
                <circle
                    key={`${point.id}outer`}
                    r="7"
                    strokeWidth="2"
                    style={{stroke: "#D91153", fill: "none"}}
                />
            </g>
        )}
    />
);

CenterMarker.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default CenterMarker;
