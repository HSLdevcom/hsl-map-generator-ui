import React from "react";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const PixelScaleSelector = ({ pixelScale, toggleTab, selected, updatePixelScale }) => {
    let input = null;
    return (
        <DropdownSelector
            title="Tekstin skaalaus"
            value={`${pixelScale}x`}
            toggleTab={toggleTab}
            selected={selected}
        >
            <div className={styles.inputRow}>
                <input
                    ref={(el) => { (input) = el; }}
                    className={styles.input}
                    defaultValue={pixelScale}
                    onBlur={() => updatePixelScale(Number(input.value.replace(",", ".")))}
                />
                <div className={styles.inputUnit}>x</div>
            </div>
        </DropdownSelector>
    );
};

export default PixelScaleSelector;
