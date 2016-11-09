import React from "react";
import classnames from "classnames";
import styles from "./Button.css";

const Button = ({ children, onClick, styleClass = "light" }) => (
    <div className={classnames(styles.button, styles[styleClass])} onClick={onClick}>
        {children}
    </div>
);

export default Button;
