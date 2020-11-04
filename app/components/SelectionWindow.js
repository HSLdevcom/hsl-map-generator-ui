import PropTypes from "prop-types";
import React from "react";
import {CanvasOverlay} from "react-map-gl";
import {mapSelectionToBbox} from "../utils/geom-utils";

const redraw = (mapSelection, updateSelectionSize) => ({
    width,
    height,
    ctx,
    project
}) => {
    const bbox = mapSelectionToBbox(mapSelection);
    const nw = project(bbox[0]);
    const se = project(bbox[1]);
    ctx.clearRect(0, 0, width, height); // eslint-disable-line no-param-reassign
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)"; // eslint-disable-line no-param-reassign
    ctx.fillRect(0, 0, width, height); // eslint-disable-line no-param-reassign
    ctx.clearRect(nw[0], nw[1], se[0] - nw[0], se[1] - nw[1]); // eslint-disable-linez
    const selectionWidth = Math.abs(nw[0] - se[0]);
    const selectionHeight = Math.abs(nw[1] - se[1]);

    updateSelectionSize([selectionWidth, selectionHeight]);
};

const SelectionWindow = ({
    viewport,
    width,
    height,
    mapSelection,
    updateSelectionSize
}) => (
    <CanvasOverlay
        {...viewport}
        width={width}
        height={height}
        redraw={redraw(mapSelection, updateSelectionSize)}
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
