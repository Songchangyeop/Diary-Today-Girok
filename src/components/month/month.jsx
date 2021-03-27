import React from 'react';
import styles from './month.module.css';
const Month = (props) => {
  return (
    <select className={styles.monthSelect} name="month" placeholder="month">
      <option placeholder="1">01월</option>
      <option placeholder="2">02월</option>
      <option placeholder="3">03월</option>
      <option placeholder="4">04월</option>
      <option placeholder="5">05월</option>
      <option placeholder="6">06월</option>
      <option placeholder="7">07월</option>
      <option placeholder="8">08월</option>
      <option placeholder="9">09월</option>
      <option placeholder="10">10월</option>
      <option placeholder="11">11월</option>
      <option placeholder="12">12월</option>
    </select>
  );
};

export default Month;
