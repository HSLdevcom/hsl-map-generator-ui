import React from "react";
import styles from "./ModeSelector.css";

const ModeSelector = ({ currentMode }) => (
    <div className={styles.logo}>
        <h2>{currentMode}</h2>
    </div>
);

export default ModeSelector;
