import React, { PropTypes } from 'react';
import HtmlOverlay from 'react-map-gl/src/overlays/html.react';
import {mapSelectionToZoom, mapSelectionToTileScale, mapSelectionToPixelSize} from 'hsl-map-generator-utils';

const redraw = (mapSelection) => () => (
  <div style={{
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: `calc(100% - 20px)`,
    color: 'white',
    fontWeight: 200
  }}>
    Zoom&nbsp;{mapSelectionToZoom(mapSelection).toFixed(3)},
    Scale&nbsp;{mapSelectionToTileScale(mapSelection).toFixed(3)},
    &nbsp;{mapSelectionToPixelSize(mapSelection).join(' x ')} px
  </div>
);


const DebugOverlay = ({viewport, width, height, mapSelection}) => (
  <HtmlOverlay
    {...viewport}
    width={width}
    height={height}
    project={() => {}}
    redraw={redraw(mapSelection)}
  />);

DebugOverlay.propTypes = {
  viewport: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired
  }).isRequired
};

export default DebugOverlay;
