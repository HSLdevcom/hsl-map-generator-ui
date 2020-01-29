import React from "react";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const MapScaleSelector = ({mapScale, toggleTab, selected, updateMapScale}) => (
    <DropdownSelector
        title="Mittakaava"
        value={`1:${mapScale}`}
        toggleTab={toggleTab}
        selected={selected}
        type="map-scale-selector">
        <div className={styles.inputRow}>
            <div className={styles.inputUnit}>1 :</div>
            <input
                data-cy="map-scale-selector-input"
                className={styles.input}
                value={mapScale}
                onChange={(event) => updateMapScale(Number(event.target.value))}
            />
        </div>
    </DropdownSelector>
);

export default MapScaleSelector;
