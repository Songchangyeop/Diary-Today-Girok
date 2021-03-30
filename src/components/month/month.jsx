import React, { useRef } from 'react';
import styles from './month.module.css';
const Month = ({ updateMonth, showMonthList, index, changeCurrentMonth }) => {
  const monthRef = useRef();

  const setNewMonth = (event) => {
    const newMonth = `0${monthRef.current.value}`;
    updateMonth(newMonth);
    showMonthList();
    changeCurrentMonth(newMonth);
  };

  return (
    <li
      ref={monthRef}
      className={styles.monthList}
      value={index + 1}
      onClick={setNewMonth}
    >
      {index + 1}
    </li>
  );
};

export default Month;
