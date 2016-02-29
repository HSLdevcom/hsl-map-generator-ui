import React from 'react';
import DropdownSelector from './DropdownSelector';

const CenterSelector = ({center, toggleTab, selected}) => (
  <DropdownSelector
    title="Sijainti"
    value={center.toArray().map(integer => integer.toFixed(5)).reverse().join(', ')}
    toggleTab={toggleTab}
    selected={selected}
  />
);

export default CenterSelector;
