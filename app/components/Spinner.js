import React from "react";
import Loader from "halogen/ClipLoader";
import styles from "./Spinner.css";
import Button from "./Button";

const overlayStyle = (containerWidth, containerHeight) => ({
    position: "absolute",
    height: containerHeight,
    width: containerWidth,
    backgroundColor: "black",
    opacity: 0.6,
    top: "0px",
    left: "0px",
});

const spinnerStyle = (containerWidth, containerHeight) => ({
    position: "absolute",
    top: containerHeight / 2,
    left: containerWidth / 2,
    transform: "translate(-50%, -50%)",
});

const Spinner = ({ width, height, isLoading, onCancelRequest,
    imagePromise, generateImageCancel }) => (
        <div>
            {isLoading ?
                <div>
                    <div style={overlayStyle(width, height)}/>
                    <div
                        style={spinnerStyle(width, height)}
                        className={styles.container}
                    >
                        <Loader color="lightgray" size="120px"/>
                        <Button
                            styleClass="lightWithBorder"
                            onClick={() => onCancelRequest(
                                imagePromise,
                                generateImageCancel,
                            )}
                        >Peruuta</Button>
                    </div>
                </div>
                : null
            }
        </div>
);


export default Spinner;
