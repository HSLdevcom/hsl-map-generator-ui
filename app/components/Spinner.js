import React from "react";
import styles from "./Spinner.css";
import Button from "./Button";

const overlayStyle = (containerWidth, containerHeight) => ({
    position: "absolute",
    height: containerHeight,
    width: containerWidth,
    backgroundColor: "black",
    opacity: 0.6,
    top: "0px",
    left: "0px"
});

const spinnerStyle = (containerWidth, containerHeight) => ({
    position: "absolute",
    top: containerHeight / 2,
    left: containerWidth / 2,
    transform: "translate(-50%, -50%)"
});

const Spinner = ({width, height, isLoading, generateImageCancelAll}) => (
    <div>
        {isLoading ? (
            <div>
                <div style={overlayStyle(width, height)} />
                <div
                    style={spinnerStyle(width, height)}
                    className={styles.container}>
                    <Button
                        styleClass="lightWithBorder"
                        onClick={generateImageCancelAll}>
                        Peruuta
                    </Button>
                </div>
            </div>
        ) : null}
    </div>
);

export default Spinner;
