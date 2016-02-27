import React from 'react';
import styles from './DropdownSelector.css';

const DropdownSelector = ({title, value}) => (
  <div className={styles.selector}>
    <div className={styles.title}>
      {title}
    </div>
    <div className={styles.value}>
      {value}
    </div>
  </div>
);

export default DropdownSelector;
