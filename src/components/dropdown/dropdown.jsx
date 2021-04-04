import React, { useRef } from 'react';
import styles from './dropdown.module.css';
const Dropdown = ({
  updateMonth,
  showMonthList,
  showDayList,
  index,
  changeCurrentMonth,
  changeCurrentDay,
  value,
  onChange,
}) => {
  const dateRef = useRef();

  const setNewMonthOrselectDate = (event) => {
    const showDate = dateRef.current.value;
    if (value === 'month') {
      const newDate = `0${dateRef.current.value}`;
      updateMonth(newDate);
      showMonthList();
      changeCurrentMonth(showDate);
    } else if (value === 'dayAdd') {
      showDayList();
      changeCurrentDay(showDate);
    } else {
      showDayList();
      onChange(event, 'date', 'id', 'beforeId');
    }
  };

  return (
    <li
      ref={dateRef}
      className={styles.monthList}
      value={String(index + 1)}
      onClick={setNewMonthOrselectDate}
    >
      {index + 1}
    </li>
  );
};

export default Dropdown;
