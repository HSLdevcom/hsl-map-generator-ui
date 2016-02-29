import React from 'react';
import DropdownSelector from './DropdownSelector';

const MapScaleSelector = ({mapScale}) => (
  <DropdownSelector title="Tarkkuus" value={'1:' + mapScale}/>
);

export default MapScaleSelector;
