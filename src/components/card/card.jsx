import React, { memo } from 'react';
import styles from './card.module.css';

const DEFAULT_IMAGE = 'images/default_logo.png';
const Card = memo(({ card, readDiary, openDiary }) => {
  const { date, fileURL, emotion } = card;

  const url = fileURL || DEFAULT_IMAGE;

  const selectCard = () => {
    const value = 'open';
    readDiary(card);
    openDiary(value);
  };

  return (
    <li className={styles.card} onClick={selectCard}>
      <div className={styles.emotion}>
        <span>{emotion}</span>
      </div>
      <h3 className={styles.date}>{date} th</h3>
      <img className={styles.photo} src={url} alt="Todayphoto" />
    </li>
  );
});

export default Card;
