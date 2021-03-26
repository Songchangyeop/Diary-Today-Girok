import React, { memo } from 'react';
import styles from './card.module.css';

const DEFAULT_IMAGE = 'images/default_logo.png';
const Card = memo(({ card }) => {
  const { date, message, theme, fileURL } = card;

  const url = fileURL || DEFAULT_IMAGE;

  return (
    // <li className={`${styles.card} ${getStyles(theme)}`}>
    <li className={styles.card}>
      <img className={styles.avatar} src={url} alt="profile" />
      <div className={styles.info}>
        <p className={styles.message}>{message}</p>
      </div>
    </li>
  );
});

// function getStyles(theme) {
//   switch (theme) {
//     case 'dark':
//       return styles.dark;
//     case 'light':
//       return styles.light;
//     case 'colorful':
//       return styles.colorful;
//     default:
//       throw new Error(`unknown theme: ${theme}`);
//   }
// }
export default Card;
