import React, { PropTypes } from 'react';
import MapGL from 'react-map-gl';
import { fromJS } from 'immutable';
import style from 'hsl-map-style';

const immutableStyle = fromJS(style);

const MapComponent = ({viewport, update}) => {
  return (
    <div>
      <MapGL
        {...viewport}
        width={window.innerWidth - 320}
        height={window.innerHeight - 60}
        mapStyle={immutableStyle}
        onChangeViewport={update}
      />
    </div>
  );
};

MapComponent.propTypes = {
  viewport: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    zoom: PropTypes.number
  }).isRequired
};

export default MapComponent;
