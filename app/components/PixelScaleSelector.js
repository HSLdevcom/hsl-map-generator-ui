import React from 'react';
import DropdownSelector from './DropdownSelector';

const PixelScaleSelector = ({pixelScale, toggleTab, selected}) => (
  <DropdownSelector
    title="Tekstin skaalaus"
    value={pixelScale}
    toggleTab={toggleTab}
    selected={selected}
  />
);

export default PixelScaleSelector;
