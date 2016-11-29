import React from "react";
import Button from "./Button";
import styles from "./FileOperations.css";

const FileOperations = ({ onGenerateImage, generateImageRequest, generateImageSuccess,
    generateImageError, onGenerateStopLabels, onSaveState, onLoadState }) => (
        <div className={styles.container}>
            <label htmlFor="load_file_button">
                <Button styleClass="darkWithBorder">Lataa</Button>
                <input
                    id="load_file_button"
                    type="file"
                    style={{ display: "none" }}
                    onChange={onLoadState}
                />
            </label>
            <Button onClick={onSaveState} styleClass="darkWithBorder">Tallenna</Button>
            <Button
                onClick={() =>
                    onGenerateImage(
                        generateImageRequest,
                        generateImageSuccess,
                        generateImageError,
                )}
            >Generoi Kartta</Button>
            <Button onClick={onGenerateStopLabels}>Generoi Pysäkit</Button>
        </div>
);

export default FileOperations;
