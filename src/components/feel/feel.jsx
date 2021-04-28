import React, { memo, useState } from 'react';
import Emotion from '../emotion/emotion';
import styles from './feel.module.css';

const Feel = memo(({ changeEmotion, showFeelComponent }) => {
  const [emotions] = useState([
    '😀',
    '😄',
    '😚',
    '😆',
    '🤣',
    '😅',
    '😊',
    '🥰',
    '😨',
    '😜',
    '🤔',
    '😒',
    '😭',
    '🤨',
    '🥱',
    '😔',
    '🤮',
    '🤯',
    '👿',
  ]);

  return (
    <div className={styles.container}>
      {emotions.map((emotion, index) => (
        <Emotion
          key={index}
          emotion={emotion}
          changeEmotion={changeEmotion}
          showFeelComponent={showFeelComponent}
        ></Emotion>
      ))}
    </div>
  );
});

export default Feel;
