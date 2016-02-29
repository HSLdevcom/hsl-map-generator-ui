import React from 'react';
import DropdownSelector from './DropdownSelector';

const CenterSelector = ({center}) => (
  <DropdownSelector title="Sijainti" value={center.toArray().map(integer => integer.toFixed(5)).reverse().join(', ')}/>
);

export default CenterSelector;
