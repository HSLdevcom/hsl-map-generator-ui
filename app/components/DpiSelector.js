import React from 'react';
import DropdownSelector from './DropdownSelector';

const DpiSelector = ({dpi}) => (
  <DropdownSelector title="Tarkkuus" value={dpi + ' dpi'}/>
);

export default DpiSelector;
