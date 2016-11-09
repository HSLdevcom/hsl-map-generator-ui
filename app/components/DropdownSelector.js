import React from "react";
import classnames from "classnames";
import styles from "./DropdownSelector.css";

const DropdownSelector = ({title, value, selected, toggleTab, children}) => (
    <div className={classnames(styles.component, selected && styles.selected)}>
        <div className={styles.selector} onClick={toggleTab}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.value}>
                {value}
            </div>
        </div>
        {selected ?
            <div className={classnames(styles.dropdownContainer, styles.selected)}>
                {children}
            </div>
        : false
        }
    </div>
);

export default DropdownSelector;
