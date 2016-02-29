import React from 'react';
import DropdownSelector from './DropdownSelector';

const PixelScaleSelector = ({pixelScale}) => (
  <DropdownSelector title="Tekstin skaalaus" value={pixelScale}/>
);

export default PixelScaleSelector;
