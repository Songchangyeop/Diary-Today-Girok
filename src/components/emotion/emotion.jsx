import React, { memo } from 'react';
import styles from './emotion.module.css';

const Emotion = memo(({ emotion, changeEmotion, showFeelComponent }) => {
  const handleEmotion = (event) => {
    const value = event.currentTarget.textContent;
    changeEmotion(value);
    showFeelComponent(false);
  };

  return (
    <h2 className={styles.emotion} onClick={handleEmotion}>
      {emotion}
    </h2>
  );
});

export default Emotion;
