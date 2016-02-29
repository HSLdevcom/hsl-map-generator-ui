import React from 'react';
import classnames from 'classnames';
import styles from './DropdownSelector.css';

const DropdownSelector = ({title, value, selected, toggleTab}) => (
  <div className={classnames(styles.component, selected && styles.selected)} onClick={toggleTab}>
    <div className={styles.selector}>
      <div className={styles.title}>
        {title}
      </div>
      <div className={styles.value}>
        {value}
      </div>
    </div>
  </div>
);

export default DropdownSelector;
