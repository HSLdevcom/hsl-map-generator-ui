import React from "react";
import Button from "./Button";
import styles from "./FileOperations.css";

const FileOperations = ({ onGenerateImage, onGenerateStopLabels, onSaveState, onLoadState }) => (
    <div className={styles.container}>
        <label htmlFor="load_file_button">
            <Button styleClass="dark">Lataa</Button>
            <input
                id="load_file_button"
                type="file"
                style={{ display: "none" }}
                onChange={onLoadState}
            />
        </label>
        <Button onClick={onSaveState} styleClass="dark">Tallenna</Button>
        <Button onClick={onGenerateImage}>Generoi Kartta</Button>
        <Button onClick={onGenerateStopLabels}>Generoi Pysäkit</Button>
    </div>
);

export default FileOperations;
