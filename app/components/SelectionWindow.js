import React, {PropTypes} from "react";
import CanvasOverlay from "react-map-gl/dist/overlays/canvas.react";
import {mapSelectionToBbox} from "../utils/geom-utils";

const redraw = (mapSelection) => ({width, height, ctx, project}) => {
    const bbox = mapSelectionToBbox(mapSelection);
    const nw = project(bbox[0]);
    const se = project(bbox[1]);
    ctx.clearRect(0, 0, width, height); // eslint-disable-line no-param-reassign
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // eslint-disable-line no-param-reassign
    ctx.fillRect(0, 0, width, height); // eslint-disable-line no-param-reassign
    ctx.clearRect(nw[0], nw[1], se[0] - nw[0], se[1] - nw[1]); // eslint-disable-line
};

const SelectionWindow = ({viewport, width, height, mapSelection}) => (
    <CanvasOverlay
        {...viewport}
        width={width}
        height={height}
        redraw={redraw(mapSelection)}
    />
);

SelectionWindow.propTypes = {
    viewport: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
        zoom: PropTypes.number.isRequired
    }).isRequired
};

export default SelectionWindow;
