import React from "react";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const PixelScaleSelector = ({pixelScale, toggleTab, selected, updatePixelScale}) => (
  <DropdownSelector
    title="Tekstin skaalaus"
    value={pixelScale + "x"}
    toggleTab={toggleTab}
    selected={selected}
  >
    <div className={styles.inputRow}>
      <input
        className={styles.input}
        value={pixelScale}
        onChange={event => updatePixelScale(Number(event.target.value))}
      />
      <div className={styles.inputUnit}>x</div>
    </div>
  </DropdownSelector>
);

export default PixelScaleSelector;
