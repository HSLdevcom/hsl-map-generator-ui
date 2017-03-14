import React from "react";
import classnames from "classnames";
import Button from "./Button";
import styles from "./FileOperations.css";
import buttonStyles from "./Button.css";

const FileOperations = props => (
    <div className={styles.container}>
        <label htmlFor="load_file_button">
            <div className={classnames(buttonStyles.button, buttonStyles.darkWithBorder)}>
                Lataa
            </div>
            <input
                id="load_file_button"
                type="file"
                style={{ display: "none" }}
                onChange={props.loadState}
            />
        </label>
        <Button onClick={props.onSaveState} styleClass="darkWithBorder">Tallenna</Button>
        <Button onClick={props.generateImage}>Generoi Kartta</Button>
        <div className={styles.row}>
            <label htmlFor="checkbox_saveWorldFile">
                <input
                    id="checkbox_saveWorldFile"
                    checked={props.saveWorldFile}
                    type="checkbox"
                    onChange={props.toggleSaveWorldFile}
                />
                <span>Tallenna georeferenssi</span>
            </label>


        </div>
    </div>
);

export default FileOperations;
