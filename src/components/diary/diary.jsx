import React, { memo } from 'react';
import styles from './diary.module.css';
const DEFAULT_IMAGE = 'images/default_logo.png';

const Diary = memo(({ readCard, openDiary }) => {
  const { date, fileURL, message, emotion } = readCard;
  const url = fileURL || DEFAULT_IMAGE;

  const handleCloseDiary = (event) => {
    openDiary(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.emotion}>
        <span>{emotion}</span>
      </div>
      <h2 className={styles.date}>{date} th</h2>
      <button
        className={styles.closeBtn}
        type="button"
        value="close"
        onClick={handleCloseDiary}
      >
        닫기
      </button>
      <img className={styles.img} src={url} alt="Todayphoto" />
      <span className={styles.message}>{message}</span>
    </div>
  );
});

export default Diary;
