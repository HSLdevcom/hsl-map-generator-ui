import React from "react";
import classnames from "classnames";
import Button from "./Button";
import styles from "./FileOperations.css";
import buttonStyles from "./Button.css";

const FileOperations = ({ onGenerateImage, generateImageRequest, generateImageSuccess,
    generateImageError, onGenerateStopLabels, onSaveState, onLoadState, loadState }) => (
        <div className={styles.container}>
            <label htmlFor="load_file_button">
                <div className={classnames(buttonStyles.button, buttonStyles.darkWithBorder)}>
                    Lataa
                </div>
                <input
                    id="load_file_button"
                    type="file"
                    style={{ display: "none" }}
                    onChange={event => onLoadState(event, loadState)}
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
        </div>
);

export default FileOperations;
