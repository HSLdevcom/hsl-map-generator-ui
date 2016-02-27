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
        width={window.innerWidth}
        height={window.innerHeight}
        mapStyle={immutableStyle}
        onChangeViewport={update}
      />
    </div>
  );
};

MapComponent.propTypes = {
  viewport: PropTypes.Object
};

export default MapComponent;
