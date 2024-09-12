import React from "react";
import {List} from "immutable";
import DropdownSelector from "./DropdownSelector";
import styles from "./DropdownSelector.css";

const CenterSelector = ({center, toggleTab, selected, updateCenter}) => {
    const validateCoordInput = (coordInput) => {
        const coordRegex = new RegExp(/^-?\d+\.?\d*$/);
        return coordRegex.test(coordInput);
    };

    return (
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
                    data-cy="manual-coords-lng-selector-input"
                    onChange={(event) => {
                        if (validateCoordInput(event.target.value)) {
                            updateCenter(
                                List([
                                    center.get(0),
                                    Number(event.target.value)
                                ])
                            );
                        }
                    }}
                />
                <div className={styles.inputUnit}>°N</div>
            </div>
            <div className={styles.inputRow}>
                <input
                    className={styles.input}
                    defaultValue={center.get(0)}
                    data-cy="manual-coords-lat-selector-input"
                    onChange={(event) => {
                        if (validateCoordInput(event.target.value)) {
                            updateCenter(
                                List([
                                    Number(event.target.value),
                                    center.get(1)
                                ])
                            );
                        }
                    }}
                />
                <div className={styles.inputUnit}>°E</div>
            </div>
        </DropdownSelector>
    );
};

export default CenterSelector;
