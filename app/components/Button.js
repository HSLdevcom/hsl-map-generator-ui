import React from "react";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({ children, onClick, styleClass = "light", disabled = false }) => {
    let classes;
    if (disabled) classes = classnames(styles.button, styles[styleClass], styles.disabled);
    else classes = classnames(styles.button, styles[styleClass]);
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;
