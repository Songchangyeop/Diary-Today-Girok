import React from 'react';
import styles from './diary.module.css';
const DEFAULT_IMAGE = 'images/default_logo.png';

const Diary = ({ readCard }) => {
  const { date, fileURL, message } = readCard;

  const url = fileURL || DEFAULT_IMAGE;
  return (
    <div className={styles.container}>
      <h2 className={styles.date}>{date} th</h2>
      <button className={styles.closeBtn} type="button">
        닫기
      </button>
      <img className={styles.img} src={url} alt="feel" />
      <span className={styles.message}>{message}</span>
    </div>
  );
};

export default Diary;
