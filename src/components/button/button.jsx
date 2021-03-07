import React from 'react';
import styles from './button.module.css';

const Button = ({ name, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {name}
  </button>
);

export default Button;
