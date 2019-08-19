import React from "react";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({
    children,
    onClick,
    styleClass = "light",
    className,
    disabled = false
}) => (
    <button
        className={classnames(
            className,
            styles.button,
            styles[styleClass],
            disabled ? styles.disabled : null
        )}
        onClick={(e) => !disabled && onClick(e)}>
        {children}
    </button>
);

export default Button;
