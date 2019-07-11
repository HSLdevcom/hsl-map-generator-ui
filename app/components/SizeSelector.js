import React from "react";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const SizeSelector = ({size, toggleTab, selected, updateSize}) => (
    <DropdownSelector
        title="Fyysinen koko"
        value={`${size.toArray().join(" x ")} mm`}
        toggleTab={toggleTab}
        selected={selected}>
        <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Leveys</div>
            <input
                className={styles.input}
                value={size.get(0)}
                onChange={(event) =>
                    updateSize([Number(event.target.value), size.get(1)])
                }
            />
            <div className={styles.inputUnit}>mm</div>
        </div>
        <div className={styles.inputRow}>
            <div className={styles.inputLabel}>Korkeus</div>
            <input
                className={styles.input}
                value={size.get(1)}
                onChange={(event) =>
                    updateSize([size.get(0), Number(event.target.value)])
                }
            />
            <div className={styles.inputUnit}>mm</div>
        </div>
    </DropdownSelector>
);

export default SizeSelector;
