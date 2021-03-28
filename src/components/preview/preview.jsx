import React from 'react';
import Card from '../card/card';
import Month from '../month/month';

import styles from './preview.module.css';

const Preview = ({
  cards,
  editorOpen,
  editOpen,
  updateMonth,
  readDiary,
  openDiary,
}) => {
  const btnClick = (e) => {
    editorOpen(e.target.value);
  };
  return (
    <section className={styles.preview}>
      <div className={styles.container}>
        <h1 className={styles.title}>Diary Preview</h1>
        <Month updateMonth={updateMonth}></Month>
      </div>
      <ul className={styles.cards}>
        {Object.keys(cards).map((key) => (
          <Card
            key={key}
            card={cards[key]}
            readDiary={readDiary}
            openDiary={openDiary}
          />
        ))}
        {!editOpen && (
          <button
            className={styles.open}
            type="button"
            onClick={btnClick}
            value="write"
          >
            편집
          </button>
        )}
      </ul>
    </section>
  );
};

export default Preview;
