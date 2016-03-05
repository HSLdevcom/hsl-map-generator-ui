import React from 'react';
import styles from './Button.css';
import classnames from 'classnames';

const Button = ({children, onClick, style = 'light'}) => (
  <div className={classnames(styles.button, styles[style])} onClick={onClick}>
    {children}
  </div>
);

export default Button;
