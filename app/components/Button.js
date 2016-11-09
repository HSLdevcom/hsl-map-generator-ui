import React from "react";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({ children, onClick, style = "light" }) => (
    <div className={classnames(styles.button, styles[style])} onClick={onClick}>
        {children}
    </div>
);

export default Button;
