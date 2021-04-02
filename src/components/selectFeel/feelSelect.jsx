import React, { useEffect } from 'react';
import styles from './feelSelect.module.css';
const FeelSelect = ({
  emotion,
  showFeelComponent,
  currentEmotion,
  updateCard,
  feelOpen,
  card,
}) => {
  const handleFeelComponent = () => {
    showFeelComponent('open');
  };

  useEffect(() => {
    console.log(feelOpen);
    if (feelOpen === false) {
      return;
    }
    console.log(updateCard);
    const emotion = 'emotion';
    updateCard({
      ...card,
      [emotion]: currentEmotion,
    });
  }, [currentEmotion]);

  return (
    <div className={styles.select}>
      <span className={styles.selectEmotion} onClick={handleFeelComponent}>
        {emotion}
      </span>
    </div>
  );
};

export default FeelSelect;
