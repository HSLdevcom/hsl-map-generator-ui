import React from 'react';
import DropdownSelector from './DropdownSelector';

const MapScaleSelector = ({mapScale, toggleTab, selected}) => (
  <DropdownSelector
    title="Mittakaava"
    value={'1:' + mapScale}
    toggleTab={toggleTab}
    selected={selected}
  />
);

export default MapScaleSelector;
