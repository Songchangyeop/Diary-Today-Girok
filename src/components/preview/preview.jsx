import React from 'react';
import Card from '../card/card';

import styles from './preview.module.css';

const Preview = ({ cards, editorOpen, editOpen }) => {
  const btnClick = (e) => {
    editorOpen(e.target.value);
  };

  console.log(cards);

  return (
    <section className={styles.preview}>
      <h1 className={styles.title}>Diary Preview</h1>
      <ul className={styles.cards}>
        {Object.keys(cards).map((key) => (
          <Card key={key} card={cards[key]} />
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
