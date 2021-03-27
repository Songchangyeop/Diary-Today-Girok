import React, { useRef } from 'react';
import styles from './month.module.css';
const Month = ({ updateMonth }) => {
  const monthRef = useRef();

  const setNewMonth = () => {
    updateMonth(monthRef.current.value);
  };
  return (
    <form>
      <select
        ref={monthRef}
        className={styles.monthSelect}
        name="month"
        placeholder="month"
        onChange={setNewMonth}
      >
        <option placeholder="1">01</option>
        <option placeholder="2">02</option>
        <option placeholder="3">03</option>
        <option placeholder="4">04</option>
        <option placeholder="5">05</option>
        <option placeholder="6">06</option>
        <option placeholder="7">07</option>
        <option placeholder="8">08</option>
        <option placeholder="9">09</option>
        <option placeholder="10">10</option>
        <option placeholder="11">11</option>
        <option placeholder="12">12</option>
      </select>
    </form>
  );
};

export default Month;
