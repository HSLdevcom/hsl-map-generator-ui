import React from 'react';
import DropdownSelector from './DropdownSelector';

const SizeSelector = ({size, toggleTab, selected}) => (
  <DropdownSelector
    title="Koko"
    value={size.toArray().join(' x ') + ' mm'}
    toggleTab={toggleTab}
    selected={selected}
  />
);

export default SizeSelector;
