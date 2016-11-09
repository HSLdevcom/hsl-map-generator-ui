import React from "react";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const DpiSelector = ({dpi, toggleTab, selected, updateDpi}) => (
  <DropdownSelector
    title="Tarkkuus"
    value={dpi + " dpi"}
    toggleTab={toggleTab}
    selected={selected}
  >
    <div className={styles.inputRow}>
      <input
        className={styles.input}
        value={dpi}
        onChange={event => updateDpi(Number(event.target.value))}
      />
      <div className={styles.inputUnit}>dpi</div>
    </div>
  </DropdownSelector>
);

export default DpiSelector;
