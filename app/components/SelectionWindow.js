import React, { PropTypes } from 'react';
import CanvasOverlay from 'react-map-gl/src/overlays/canvas.react';
import {mapSelectionToBbox} from '../utils/geom-utils';

const redraw = (mapSelection) =>
  ({width, height, ctx, project}) => {
    const bbox = mapSelectionToBbox(mapSelection);
    const nw = project(bbox[0]);
    const se = project(bbox[1]);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, width, height);
    ctx.clearRect(nw[0], nw[1], se[0] - nw[0], se[1] - nw[1]);
  };


const CenterMarker = ({viewport, width, height, mapSelection}) => (
  <CanvasOverlay
    {...viewport}
    width={width}
    height={height}
    redraw={redraw(mapSelection)}
  />);

CenterMarker.propTypes = {
  viewport: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired
};

export default CenterMarker;
