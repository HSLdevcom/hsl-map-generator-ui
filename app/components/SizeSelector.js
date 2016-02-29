import React from 'react';
import DropdownSelector from './DropdownSelector';

const SizeSelector = ({size}) => (
  <DropdownSelector title="Koko" value={size.toArray().join(' x ') + ' mm'}/>
);

export default SizeSelector;
