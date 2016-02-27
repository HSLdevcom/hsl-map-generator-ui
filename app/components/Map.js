import React, { PropTypes } from 'react';
import MapGL from 'react-map-gl';
import CenterMarker from '../containers/CenterMarker';
import { fromJS } from 'immutable';
import style from 'hsl-map-style';

const immutableStyle = fromJS(style);

const MapComponent = ({viewport, updateViewport}) => (
    <div>
      <MapGL
        {...viewport}
        width={window.innerWidth - 320}
        height={window.innerHeight - 60}
        mapStyle={immutableStyle}
        onChangeViewport={updateViewport}
      >
        <CenterMarker
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
    zoom: PropTypes.number.isRequired
  }).isRequired
};

export default MapComponent;
