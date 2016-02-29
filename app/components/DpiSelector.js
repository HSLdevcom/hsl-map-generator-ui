import React from 'react';
import DropdownSelector from './DropdownSelector';

const DpiSelector = ({dpi, toggleTab, selected}) => (
  <DropdownSelector
    title="Tarkkuus"
    value={dpi + ' dpi'}
    toggleTab={toggleTab}
    selected={selected}
  />
);

export default DpiSelector;
