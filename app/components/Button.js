import React from "react";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({
    children,
    onClick,
    styleClass = "light",
    className,
    disabled = false,
    loading = null,
    type
}) => (
    <button
        data-cy={`${type}-button`}
        className={classnames(
            className,
            styles.button,
            styles[styleClass],
            disabled ? styles.disabled : null
        )}
        onClick={(e) => !disabled && onClick(e)}>
        {!loading ? (
            children
        ) : (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
            </div>
        )}
    </button>
);

export default Button;
