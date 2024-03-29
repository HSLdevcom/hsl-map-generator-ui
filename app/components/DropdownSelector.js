import React from "react";
import classnames from "classnames";
import styles from "./DropdownSelector.css";

const DropdownSelector = ({
    title,
    value,
    selected,
    toggleTab,
    children,
    type
}) => (
    <div
        data-cy={`${type}-button`}
        className={classnames(styles.component, selected && styles.selected)}>
        <button type="button" className={styles.selector} onClick={toggleTab}>
            <div className={styles.title}>{title}</div>
            <div className={styles.value}>{value}</div>
        </button>
        {selected ? (
            <div
                className={classnames(
                    styles.dropdownContainer,
                    styles.selected
                )}>
                {children}
            </div>
        ) : (
            false
        )}
    </div>
);

export default DropdownSelector;
