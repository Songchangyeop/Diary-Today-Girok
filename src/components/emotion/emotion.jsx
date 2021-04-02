import React from 'react';
import styles from './emotion.module.css';

const Emotion = ({ emotion, changeEmotion, showFeelComponent }) => {
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
};

export default Emotion;
