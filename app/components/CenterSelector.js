import React from "react";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const CenterSelector = ({center, toggleTab, selected, updateCenter}) => (
    <DropdownSelector
        title="Sijainti"
        value={center
            .toArray()
            .reverse()
            .join(", ")}
        toggleTab={toggleTab}
        selected={selected}
        type="center-selector">
        <div className={styles.inputRow}>
            <input
                className={styles.input}
                defaultValue={center.get(1)}
                onChange={(event) =>
                    updateCenter({
                        location: [center.get(0), Number(event.target.value)]
                    })
                }
            />
            <div className={styles.inputUnit}>°N</div>
        </div>
        <div className={styles.inputRow}>
            <input
                className={styles.input}
                defaultValue={center.get(0)}
                onChange={(event) =>
                    updateCenter({
                        location: [Number(event.target.value), center.get(1)]
                    })
                }
            />
            <div className={styles.inputUnit}>°E</div>
        </div>
    </DropdownSelector>
);

export default CenterSelector;
