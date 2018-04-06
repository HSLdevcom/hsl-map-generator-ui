import React from "react";
import styles from "./ModeSelector.css";

const ModeSelector = ({ currentMode, toggleMode }) => (
    <div className={styles.logo}>
        <h2>{currentMode}</h2>
        <button className={styles.switchButton} onClick={toggleMode}>vaihda tila</button>
    </div>
);

export default ModeSelector;
